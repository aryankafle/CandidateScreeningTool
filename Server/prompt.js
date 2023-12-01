const OpenAI = require("openai");
require("dotenv").config()

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const GPTresponse = client.chat.completions.create({

    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: "Say hello"}],

});

try {
  console.log(GPTresponse.usage.total_tokens);
  console.log(GPTresponse.data.choices[0].message.content);
}
catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
}