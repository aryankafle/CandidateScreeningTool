import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//import fileUpload from "express-fileupload"
import multer from "multer"

import linkedInRoutes from "./routes/LinkedIn.routes.js"
import openAIRoutes from "./routes/OpenAI.routes.js"
import MongoDBRoutes from "./routes/MongoDB.routes.js"
import textScanRoutes from "./routes/textScan.routes.js"




dotenv.config()
const PORT = process.env.PORT || 3001
const storage = multer.memoryStorage
const upload = multer({
    storage: storage
});


const app = express();

app.use(cors());
app.use(express.json());
//app.use(fileUpload());


app.use("/linkedIn", linkedInRoutes)
app.use("/openAI", openAIRoutes)
app.use("/mongoDB", MongoDBRoutes)
app.use("/textScan", textScanRoutes)



app.post('/upload', upload.single("file"), (req, res) => { 
    console.log(req.file + "file")
    res.redirect('/textScan/convert-pdf-to-img') 
    
}); 


app.get("/ping", (req, res) => {
    res.status(200).json({message: "pong"})
});

app.get("/", (req, res) => {
    res.status(200).json({message: "Archnatin CST Back-end Server"})
})

app.listen(PORT, () => {
    console.log(`Express is running and server is listening on ${PORT}`)
});
// app.get("/home", fileUpload(), function(req, res){})
// app.get("/home", upload.any(), function(req, res){
//     console.log(req.files)
// })