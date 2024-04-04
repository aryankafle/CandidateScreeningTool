import dotenv from "dotenv"
import path from "path"

const __dirname = import.meta.dirname;
const stage = process.env.NODE_ENV
const envPath = {path: path.resolve(__dirname, stage === "development" ? `../../.env.local`: `../../.env.production`)}  

const envError = dotenv.config(envPath).error

if(envError) throw new Error(envError)

const config = {

    STAGE: stage,
    IS_LOCAL: stage === "development",

    CLIENT: process.env.CLIENT || 'http://localhost:3000',
    SERVER_HOST: process.env.SERVER_HOST || 'http://localhost:3001',
    EXPRESS_PORT: process.env.EXPRESS_PORT || '3001',

    OPENAI_API_KEY: process.env.OPENAI_API_KEY || undefined,

    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID || undefined,
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET || undefined,

    MONGODB_ACCESS_URI: process.env.MONGODB_ACCESS_URI || undefined,

    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID || undefined,
    GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET || undefined,

    SESSION_SECRET: process.env.SESSION_SECRET

}

export default config