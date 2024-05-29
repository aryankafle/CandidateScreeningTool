import mongoStore from "connect-mongo";
import config from "../config/env.config.js";
import { client } from "../database/MongoDB.database.js";

export const sessionConfig = {
    secret: config.SESSION_SECRET,
    store: mongoStore.create({
        client,
        dbName: 'authentication'
    }),
    resave: false,
    saveUninitialized: true,
    maxAge: 1000*60*24*7, // 1 week
    cookie: {
        partitioned: true,
        sameSite: "none",
        secure: !config.IS_LOCAL,
    }
}

if(config.IS_LOCAL) {
    sessionConfig.cookie = {
        secure: !config.IS_LOCAL,
    }
}