const OpenAI = require("openai");
require("dotenv").config({path:'server/.env'})
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
const GPTresponse = await client.chat.completions.create({ //add await before client if nothing else works (DONT DO THIS ANYONE ELSE)
    messages: [{"role": "user", "content": "Say hello world"}],
    model: "gpt-3.5-turbo",
    //await function lowk might be the death of us if it gets bad in the future

});
//console.log(GPTresponse.choices[0].message.content);

//GPTresponse.then((response) =>{console.log(response.statusText);});
//console.log(GPTresponse.choices[0].message.content);
try{
//console.log(GPTresponse.usage.total_tokens);
//console.log(GPTresponse.choices[0].message.content);
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
}
main();