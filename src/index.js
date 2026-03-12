export default {
  async fetch(request, env, ctx) {

    const url = new URL(request.url);

    if (url.pathname === "/favicon.ico") {
      return new Response("", { status: 204 });
    }

    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);

    let cached = await cache.match(cacheKey);
    if (cached) return cached;

    const prompt = `
Erstelle 3 kurze spezifische aktuelle News über E-Commerce.

Antworte ausschließlich im JSON Format.
Keine Einleitung, kein Text davor oder danach.
Es ist wichtig dass jeweil ein title und ein text in {} steht.
Ohne \`\`\`json

Format:

[
 {"title":"...","text":"..."},
 {"title":"...","text":"..."},
 {"title":"...","text":"..."}
]
`;

    const aiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const aiData = await aiResponse.json();
    const text = aiData.candidates[0].content.parts[0].text;

    let news;
    console.log(aiData);
    try {
      news = JSON.parse(text);
    } catch {
      news = "Error";
    }

    const response = new Response(JSON.stringify(news), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=1800"
      }
    });

    ctx.waitUntil(cache.put(cacheKey, response.clone()));

    return response;
  }
};