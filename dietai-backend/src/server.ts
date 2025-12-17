import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        message: 'api running'
    });
});

app.post('/api/dietai', async (req: Request, res: Response) => {
    try {
        const { user_prompt } = req.body;

        if (!user_prompt || user_prompt.trim().length == 0) {
            return res.status(400).json({
                error: 'user_prompt is mandatory!'
            });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a nutritionist. Analyze the foods and return calories and macros."
                },
                {
                    role: "user",
                    content: user_prompt
                }
            ]
        });

        const answer = completion.choices[0].message.content;

        res.status(200).json({
            question: user_prompt,
            answer: answer
        });
    } catch (error) {
        console.error('API ERROR', error);
        res.status(500).json({
            error: "error processing your request"
        });
    }
});

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
    console.log(`Health check in http://localhost:${PORT}/health`);
});