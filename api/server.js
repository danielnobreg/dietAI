import express, {json} from "express";
import { gerarResposta } from "./openai.js";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/api/teste", async (req, res) => {
    try {
        const { prompt } = req.body;
        const resposta = await gerarResposta(prompt);
        res.status(200).json({
            recebido: prompt,
            resposta
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Erro interno."});
    }
});

app.listen(port, () => {
    console.log(`server running on ${port}`)
});