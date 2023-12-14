import PageNotFoundPopup from '../components/PageNotFoundPopup';
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query"

function App() {

  // Dummy Code for Plumbing Project
  const [openAIAnswer, setOpenAIAnswer] = useState("fetching response message...");
  const [openAITokensUsed, setOpenAITokensUsed] = useState("fetching tokens used data...");
  const [dbConnectionTest, setDbConnectionTest] = useState("Fetching database connection status...")

  const getOpenAITest = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/openAI/ask-question-with-role`, {
      params: {
        message: "Say hello world with extreme enthusiasm. Use less than 100 tokens.",
        role: "user"
      }
    })

    return response.data;
  }

  const getMySQLTest = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/mySQL/test-database-connection`)

    return response.data
  }

  const openAIQuery = useQuery({
    queryKey: ['get', 'openAI', 'testQuery'],
    queryFn: getOpenAITest,
    staleTime: Infinity,
    cacheTime: Infinity
  })
  const mySQLQuery = useQuery({
    queryKey: ['post', 'mySQL', 'testQuery'],
    queryFn: getMySQLTest,
    staleTime: Infinity,
    cacheTime: Infinity
  })

  useEffect(() => {    
    setOpenAIAnswer(openAIQuery.data?.answer)
    setOpenAITokensUsed(openAIQuery.data?.tokensUsed)
    setDbConnectionTest(mySQLQuery.data?.message)
  }, [openAIQuery, mySQLQuery])

  return (
    <>
        <h1>Open AI Message: {openAIAnswer}</h1>
        <h1>Open AI TokensUsed: {openAITokensUsed}</h1>
        <h1>Server Connection Status: {dbConnectionTest}</h1>
    </>
  )
}

export default App