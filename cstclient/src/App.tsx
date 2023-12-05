import {Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import PageNotFoundPopup from './components/PageNotFoundPopup';
import axios from "axios";
import { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker"

function App() {


  // Dummy Code for Plumbing Project
  const [openAIAnswer, setOpenAIAnswer] = useState("NO RESPONSE MESSAGE");
  const [openAITokensUsed, setOpenAITokensUsed] = useState("NO TOKENS USED DATA");
  const [dbthing, setDbthing] = useState("nnooooo")

  useEffect(() => {
    console.log("ip:", `${process.env.REACT_APP_SERVER_HOST_IP}:${process.env.REACT_APP_SERVER_PORT}/openAI/ask-question`)
    
    trackPromise(axios.get(`${process.env.REACT_APP_SERVER_HOST_IP}:${process.env.REACT_APP_SERVER_PORT}/mySQL/query-database`))
    .then((res) => {
      if(res.status == 200) {
        setDbthing("yeahhhhhh");
      }
    }).catch((err) => {
      console.log(err);
    })

    trackPromise(axios.get(`${process.env.REACT_APP_SERVER_HOST_IP}:${process.env.REACT_APP_SERVER_PORT}/openAI/ask-question`, {
      params: {
        message: "say hello world enthusiastically"
      }
    }))
    .then((res) => {
      console.log("data", res.data)
      setOpenAIAnswer(res.data.answer);
      setOpenAITokensUsed(res.data.tokensUsed)
    })
    .catch((err) => {
      console.log("error", err);
    })

    trackPromise(axios.get(`${process.env.REACT_APP_SERVER_HOST_IP}:${process.env.REACT_APP_SERVER_PORT}/mySQL/query-database`))
    .then((res) => {
      console.log("ressingtojn: ", res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <>
        <NavBar />
        <Routes>
          <Route index element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<PageNotFoundPopup />} />
        </Routes>
        <h1>Open AI Message: {openAIAnswer}</h1>
        <h1>Open AI TokensUsed: {openAITokensUsed}</h1>
        <h1>Thing: {dbthing}</h1>
    </>
  )
}

export default App