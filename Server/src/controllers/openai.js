import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()


const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});



export const askQuestion = async (req, res) => {
  const question = {
    messages: [{"role": "user", "content": req.message}],
    model: "gpt-3.5-turbo",
  }

  var GPTresponse;
  var tokensUsed;
  var responseMessage;



  //add await before client if nothing else works (DONT DO THIS ANYONE ELSE)
  try {
    GPTresponse = await client.chat.completions.create(question)
  }
  catch (err) {
    console.log(err.message)
  }

  try {
    responseMessage = GPTresponse.choices[0].message.content;
    tokensUsed = GPTresponse.usage.total_tokens
  }
  catch (err) {
    console.log(err.message)
  }



  console.log(`ChatGPT request message: ${req.message}`)
  console.log(`ChatGPT: Request used ${tokensUsed} tokens.`);
  console.log(`ChatGPT response message: ${responseMessage}`);



  const reponseBody = {
    answer: GPTresponse.choices[0].message.content,
    tokensUsed: GPTresponse.usage.total_tokens 
  }

  return res.status(200).json(reponseBody);
}