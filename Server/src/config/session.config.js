import config from "../config/env.config.js";
import { client } from "../inits/MongoDB.init.js"
import mongoStore from "connect-mongo"

export const sessionConfig = {
    secret: config.SESSION_SECRET,
    store: mongoStore.create({
        client,
        dbName: 'sessions'
    }),
    resave: false,
    saveUninitialized: true,
    origin: config.CLIENT,
    cookie: {
        partitioned: true,
        sameSite: "none",
        secure: !config.IS_LOCAL,
    }
}