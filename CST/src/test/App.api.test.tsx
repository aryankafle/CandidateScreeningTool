import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useQuery } from "react-query"
import { FileContext } from "../context/FileContext";

function App() {
  
  // Dummy Code for Plumbing Project
  const [openAIAnswer, setOpenAIAnswer] = useState("fetching response message...");
  const [openAITokensUsed, setOpenAITokensUsed] = useState("fetching tokens used data...");
  const [dbConnectionTest, setDbConnectionTest] = useState("Fetching database connection status...")
  const [pdfData, setPdfData] = useState("GRAH THIS IS RESPONSE");
  const fileContext = useContext(FileContext)


  const getpdftest = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/textScan/convert-pdf-to-img`)
    console.log(response.data + "bruh")
    return response.data
  }

  const getOpenAITest = async () => {
    console.log("this is when chat gpt makes request")
    const text = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/textScan/convert-pdf-to-img`) //, {
    //   params: {
    //     message: Buffer.from(JSON.stringify(fileContext.uploadedFiles))
    //   }
    // })
  
    const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/openAI/ask-question-with-role`, {
      params: {
        message: "Use less than 100 tokens and List the first 5 words of the following text: " + text.data.message,
        role: "user"
      }
    })

    return response.data;
  }

  const getMongoDBTest = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/mongoDB/test-mongoDB-connection`)

    return response.data
  }



  const TextScanQuery = useQuery({
    queryKey: ['get', 'textScan', 'testQuery'],
    queryFn: getpdftest,
    staleTime: Infinity,
    cacheTime: Infinity
  });

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

//   const textscantest = async () => {
//     const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/textScan/ScanText`, {
//     params: {
//         message: TextScanQuery.data?.message ,
//     }
// })
//     return response.data
// }
// const ImgScanQuery = useQuery({
//   queryKey: ['post', 'ScanText', 'testQuery'],
//   queryFn: textscantest,
//   staleTime: Infinity,
//   cacheTime: Infinity
// })
//console.log(TextScanQuery.data?.message + "buh")
  useEffect(() => {    
    openAIQuery.data?.answer && setOpenAIAnswer(openAIQuery.data?.answer)
    openAIQuery.data?.tokensUsed && setOpenAITokensUsed(openAIQuery.data?.tokensUsed)
    MongoDBQuery.data?.message && setDbConnectionTest(MongoDBQuery.data?.message) 
    TextScanQuery.data?.message && setPdfData(TextScanQuery.data?.message)  
  }, [openAIQuery, MongoDBQuery, TextScanQuery])
  return (
    <>
        <h1>Open AI Message: {openAIAnswer}</h1>
        <h1>Open AI TokensUsed: {openAITokensUsed}</h1>
        <h1>Server Connection Status: {dbConnectionTest}</h1>
        <h1> TextScanMessage: {pdfData} </h1>
    </>
  )
}

export default App