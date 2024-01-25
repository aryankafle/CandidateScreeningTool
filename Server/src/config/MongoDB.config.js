import dotenv from "dotenv"
import { MongoClient, ServerApiVersion } from 'mongodb';
dotenv.config()

const client = new MongoClient(process.env.MONGODB_ACCESS_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

export default client