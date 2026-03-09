async function loadNews() {
  try {
    const res = await fetch("https://ecommerce-news.marcel-8cf.workers.dev");
    const data = await res.json();

    // Text aus Gemini-Antwort
    const text = data.candidates[0].content.parts[0].text;

    // Split nach den "---" Trennern
    const newsArray = text.split('---').map(n => n.trim()).filter(n => n);

    const cardWrappers = document.querySelectorAll('.card-wrapper');

    newsArray.forEach((news, i) => {
      if (!cardWrappers[i]) return;

      const headerMatch = news.match(/Header:"([\s\S]*?)"/);
      const textMatch = news.match(/Text:"([\s\S]*?)"$/);

      const h2 = cardWrappers[i].querySelector('h2.card-title');
      const p = cardWrappers[i].querySelector('p');

      if (h2 && headerMatch) h2.innerText = headerMatch[1];
      if (p && textMatch) p.innerText = textMatch[1];
    });
  } catch (err) {
    console.error("Fehler beim Laden der News:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadNews);