import dotenv from "dotenv"
import { ServerApiVersion } from 'mongodb';
dotenv.config()

const mongoConfig = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}

export default mongoConfig