import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query"

function App() {

  // Dummy Code for Plumbing Project
  const [openAIAnswer, setOpenAIAnswer] = useState("fetching response message...");
  const [openAITokensUsed, setOpenAITokensUsed] = useState("fetching tokens used data...");
  const [dbConnectionTest, setDbConnectionTest] = useState("Fetching database connection status...")
  const [response, setResponse] = useState("GRAH THIS IS RESPONSE");
  const getOpenAITest = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/openAI/ask-question-with-role`, {
      params: {
        message: "Say hello world with extreme enthusiasm. Use less than 100 tokens.",
        role: "user"
      }
    })

    return response.data;
  }

  const getMongoDBTest = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/mongoDB/test-mongoDB-connection`)

    return response.data
  }
  const pdftest = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/textScan/convert-pdf-to-img`)
    return response.data
  }

  const TextScanQuery = useQuery({
    queryKey: ['get', 'TextScan', 'testQuery'],
    queryFn: pdftest,
    staleTime: Infinity,
    cacheTime: Infinity
  })

  const openAIQuery = useQuery({
    queryKey: ['get', 'openAI', 'testQuery'],
    queryFn: getOpenAITest,
    staleTime: Infinity,
    cacheTime: Infinity
  })
  const MongoDBQuery = useQuery({
    queryKey: ['post', 'MongoDB', 'testQuery'],
    queryFn: getMongoDBTest,
    staleTime: Infinity,
    cacheTime: Infinity
  })

  const textscantest = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/textScan/scantext`, {
    params: {
        message: TextScanQuery.data?.message ,
    }
})
    return response.data
}
const ImgScanQuery = useQuery({
  queryKey: ['get', 'scantext', 'testQuery'],
  queryFn: textscantest,
  staleTime: Infinity,
  cacheTime: Infinity
})
  useEffect(() => {    
    openAIQuery.data?.answer && setOpenAIAnswer(openAIQuery.data?.answer)
    openAIQuery.data?.tokensUsed && setOpenAITokensUsed(openAIQuery.data?.tokensUsed)
    MongoDBQuery.data?.message && setDbConnectionTest(MongoDBQuery.data?.message)
    ImgScanQuery.data?.message && setResponse(ImgScanQuery.data.message)  
  }, [openAIQuery, MongoDBQuery, ImgScanQuery])

  return (
    <>
        <h1>Open AI Message: {openAIAnswer}</h1>
        <h1>Open AI TokensUsed: {openAITokensUsed}</h1>
        <h1>Server Connection Status: {dbConnectionTest}</h1>
        <h1> TextScanMessage: {response} </h1>
    </>
  )
}

export default App