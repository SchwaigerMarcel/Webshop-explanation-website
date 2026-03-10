async function loadNews() {

  try {

    const res = await fetch("https://ecommerce-news.marcel-8cf.workers.dev");
    const text = await res.text();

    console.log("RAW:", text);

    const news = JSON.parse(text);

    console.log("Parsed news:", news);

    const titles = document.querySelectorAll(".news-title");
    const texts = document.querySelectorAll(".news-text");

    console.log("Gefundene Titel Elemente:", titles.length);
    console.log("Gefundene Text Elemente:", texts.length);

    news.forEach((item, i) => {

      console.log("Fülle Karte:", i, item);

      if (titles[i]) {
        titles[i].textContent = item.title;
      }

      if (texts[i]) {
        texts[i].textContent = item.text;
      }

    });

  } catch (err) {
    console.error("Fehler:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadNews);