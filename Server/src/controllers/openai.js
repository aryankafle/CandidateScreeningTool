const OpenAI = require("openai");
require("dotenv").config({path:'server/.env'})
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default askQuestion = async (req, res) => {
  const question = {
    messages: [{"role": "user", "content": req.message}],
    model: "gpt-3.5-turbo",
  }

  //add await before client if nothing else works (DONT DO THIS ANYONE ELSE)
  const GPTresponse = await client.chat.completions.create(question)

  try {
    console.log(GPTresponse.usage.total_tokens);
    console.log(GPTresponse.choices[0].message.content);
  }
  catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
  }

  const reponseBody = {
    answer: GPTresponse.choices[0].message.content,
    tokensUsed: GPTresponse.usage.total_tokens 
  }

  return res.status(200).json(reponseBody);
}