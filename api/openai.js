// openai.js
import "dotenv/config";
import OpenAI from "openai";

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function gerarResposta(prompt) {
  const resposta = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt
  });

  // NOVO FORMATO DA API:
  const texto = resposta.output[0].content[0].text;

  return texto;
}