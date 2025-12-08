// openai.js
import "dotenv/config";
import OpenAI from "openai";

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateAnswer(user_prompt) {
  const answer = await client.responses.create({
    model: "gpt-4o-mini",
    instructions: 'Você é um nutricionista especializado em análise de consumo alimentar. Sua tarefa é receber alimentos informados pelo usuário e estimar calorias e proteínas totais usando valores médios de porções comuns (por exemplo: cuscuz = 1 prato médio, frango = 100 g, ovo = 1 unidade, arroz = 1 concha). Nunca utilize porções exageradas ou irreais. Sempre retorne exatamente o seguinte formato, sem explicações adicionais: "Total de kcal consumidas: X" e "Total de proteínas consumidas: Y g".',
    input: user_prompt
  });

  const result_answer = answer.output[0].content[0].text;

  return result_answer;
}