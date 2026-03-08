import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getWeather() {

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: "Wie ist das Wetter heute in Linz, Österreich?"
  });

  console.log(response.output_text);
}

getWeather();