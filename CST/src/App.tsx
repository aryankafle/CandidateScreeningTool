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
  const [dbthing, setDbthing] = useState("")

  useEffect(() => {    
    trackPromise(axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/mySQL/test-database-connection`))
    .then((res) => {
      if(res.status == 200) {
        setDbthing("Database succesfully connected to server.");
      }
    }).catch((err) => {
      console.log(err);
    })

    trackPromise(axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/openAI/ask-question`, {
      params: {
        message: "Write me a haiku about typescript. Make sure that the haiku does not exceed 100 characters. Only respond with this haiku, add \"{\"\n\"}\" at the start and between lines."
      }
    }))
    .then((res) => {
      console.log("data", res.data)
      setOpenAIAnswer(res.data.answer);
      setOpenAITokensUsed(res.data.tokensUsed)
    })
    .catch((err) => {
      console.log("OpenAI request error: ", err);
    })
  }, [])

  return (
    <div>
        <NavBar />
        <Routes>
          <Route index element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<PageNotFoundPopup />} />
        </Routes>
        <text className="line-clamp-3">Open AI Message: {openAIAnswer}</text>
        <text className="line-clamp-3">Open AI TokensUsed: {openAITokensUsed}</text>
        <text className="line-clamp-3">Server Connection Status: {dbthing}</text>
        <text className="line-clamp-3">Server Connection Status: {dbthing}</text>
        
    </div>
  )
}

export default App