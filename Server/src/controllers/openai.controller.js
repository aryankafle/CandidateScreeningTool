import dotenv from "dotenv"
import { queryAI } from "../models/services/OpenAIQuery.service.js"





export const askQuestionWithRole = async (req, res) => {
  const query = req.query
  const GPTresponse = await queryAI(query.message, query.role);

  const tokensUsed = GPTresponse.usage.total_tokens;
  const responseMessage = GPTresponse.choices[0].message.content;

  console.log(`ChatGPT request message: ${req.query.message}`)
  console.log(`ChatGPT: Request used ${tokensUsed} tokens.`);
  console.log(`ChatGPT response message: ${responseMessage}`);

  const response = {
    body: {
      answer: responseMessage,
      tokensUsed: tokensUsed
    }
  }

  return res.status(200).send(response.body);
}