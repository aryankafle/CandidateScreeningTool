import config from "./env.config.js"

export const corsConfig = {

    origin: config.CLIENT,
    methods: "GET,POST,PUT,DELETE",
    optionsSuccessStatus: 200,
    credentials: true,

}