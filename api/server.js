import express from "express";
import { generateAnswer } from "./openai.js";
import path from "path";
import { fileURLToPath } from "url";


const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/api/dietai", async (req, res) => {
    try {
        const { user_prompt } = req.body;
        const answer = await generateAnswer(user_prompt);
        res.status(200).json({
            question: user_prompt,
            answer
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Internal error."});
    }
});

app.listen(port, () => {
    console.log(`server running on ${port}`)
});