import client from "./config/MongoDB.config.js"

const connection = await client.connect(async (err) => {
    if(err) {
        console.log("MySQL: Connection error: Could not connect to database from server. The following error was thrown: ", err)
        await client.close();
    } else {
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
})

export const checkMongoDBConnection = () => {
    return !!connection
}