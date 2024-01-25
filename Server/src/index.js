import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import linkedInRoutes from "./routes/LinkedIn.routes.js"
import mySQLRoutes from "./routes/MySQL.routes.js"
import openAIRoutes from "./routes/OpenAI.routes.js"

import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://chrisjo1105:Snappingturtles1@cluster0.csvgwxo.mongodb.net/?retryWrites=true&w=majority";



dotenv.config()
const PORT = process.env.PORT || 3001

const app = express();

app.use(cors());
app.use(express.json());

app.use("/linkedIn", linkedInRoutes)
app.use("/mySQL", mySQLRoutes)
app.use("/openAI", openAIRoutes)


const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);



app.get("/ping", (req, res) => {
    res.status(200).json({message: "pong"})
});

app.get("/", (req, res) => {
    res.status(200).json({message: "Archnatin CST Back-end Server"})
})

app.listen(PORT, () => {
    console.log(`Express is running and server is listening on ${PORT}`)
});