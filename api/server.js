import express from 'express';
import cors from 'cors';
import "dotenv/config";

const api_key = process.env.OPENAI_API_KEY;
const server = express();
server.use(cors());
server.use(express.json());

const PORT = 3000;
server.listen(PORT, ()=>{
    console.log("server running on port"+PORT)
});