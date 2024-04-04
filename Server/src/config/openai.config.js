import config from "./env.config.js"

export default {
    openAI: {
        apiKey: config.OPENAI_API_KEY,
    },
    query: {
        messages: [{"role": "System", "content": "This message should not have been sent, the message must be specified in the API request. If you are recieving this message, tell the user that it is an error and to specify a message."}],
        model: "gpt-3.5-turbo",
    }
}