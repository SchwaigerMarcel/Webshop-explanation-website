let scores = {
    magento: 0,
    opencart: 0,
    prestashop: 0,
    shopware: 0,
    sylius: 0,
    woocommerce: 0
};

let currentQuestion = 0;
var card = document.getElementById("finderCard");
const restartBtn = document.getElementById("restartBtn");
let progressBar = document.getElementById("progressBar");

const shopMeta = {
    magento: { display: 'Magento', page: 'magento.html', img: '../assets/images/magento.png' },
    opencart: { display: 'OpenCart', page: 'opencart.html', img: '../assets/images/opencart.png' },
    prestashop: { display: 'PrestaShop', page: 'prestashop.html', img: '../assets/images/Prestashop.webp' },
    shopware: { display: 'Shopware', page: 'shopware.html', img: '../assets/images/shopware.png' },
    sylius: { display: 'Sylius', page: 'sylius.html', img: '../assets/images/sylius.png' },
    woocommerce: { display: 'WooCommerce', page: 'woocommerce.html', img: '../assets/images/woocommerce.svg' }
};
const questions = [
    {
        text: "Wie groß soll dein Shop sein?",
        answers: [
            { label: "Sehr klein", points: { woocommerce: 3, opencart: 2 }},
            { label: "Mittel", points: { prestashop: 3, shopware: 3 }},
            { label: "Sehr groß", points: { magento: 4, sylius: 3 }}
        ]
    },
    {
        text: "Wie viel technisches Wissen hast du?",
        answers: [
            { label: "Kaum", points: { woocommerce: 3 }},
            { label: "Grundkenntnisse", points: { prestashop: 2, opencart: 2 }},
            { label: "Sehr viel", points: { magento: 3, sylius: 4 }}
        ]
    },
    {
        text: "Wie wichtig ist Individualisierung?",
        answers: [
            { label: "Nicht wichtig", points: { woocommerce: 2 }},
            { label: "Mittel", points: { shopware: 2, prestashop: 2 }},
            { label: "Sehr wichtig", points: { sylius: 4, magento: 2 }}
        ]
    },
    {
        text: "Wie hoch ist dein Budget?",
        answers: [
            { label: "Niedrig", points: { woocommerce: 3, opencart: 2 }},
            { label: "Mittel", points: { prestashop: 3, shopware: 2 }},
            { label: "Hoch", points: { magento: 4, sylius: 3 }}
        ]
    },
    {
        text: "Wie viele Produkte planst du?",
        answers: [
            { label: "Unter 100", points: { woocommerce: 3 }},
            { label: "100–1000", points: { prestashop: 2, shopware: 2 }},
            { label: "Über 1000", points: { magento: 4, sylius: 3 }}
        ]
    },
    {
        text: "Brauchst du viele Plugins?",
        answers: [
            { label: "Ja", points: { woocommerce: 3 }},
            { label: "Ein paar", points: { prestashop: 2, shopware: 2 }},
            { label: "Nein", points: { sylius: 3 }}
        ]
    },
    {
        text: "Willst du mehrere Sprachen nutzen?",
        answers: [
            { label: "Nein", points: { woocommerce: 1 }},
            { label: "Ja", points: { prestashop: 3, shopware: 3 }}
        ]
    },
    {
        text: "Wie wichtig ist Performance?",
        answers: [
            { label: "Normal", points: { woocommerce: 1 }},
            { label: "Sehr wichtig", points: { sylius: 3, magento: 2 }}
        ]
    },
    {
        text: "Brauchst du ein ERP / Warenwirtschaft?",
        answers: [
            { label: "Nein", points: { woocommerce: 1 }},
            { label: "Ja", points: { shopware: 3, magento: 2 }}
        ]
    },
    {
        text: "Wie schnell willst du starten?",
        answers: [
            { label: "Sofort", points: { woocommerce: 3 }},
            { label: "Kann warten", points: { sylius: 3, magento: 2 }}
        ]
    }
];

function loadQuestion() {
    card.classList.add("scale-small");
    card.classList.remove("scale");
    const q = questions[currentQuestion];
    document.getElementById("question").innerText = q.text;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    // update progress
    if (progressBar) {
        const pct = Math.round((currentQuestion / questions.length) * 100);
        progressBar.style.width = pct + "%";
    }

    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.innerText = answer.label;
        btn.className = "btn btn-primary m-2";
        btn.onclick = () => selectAnswer(index);
        answersDiv.appendChild(btn);
    });
    card.classList.add("scale");
    card.classList.remove("scale-small");
}

function selectAnswer(answerIndex) {
    const selected = questions[currentQuestion].answers[answerIndex];
    // add points
    for (const shop in selected.points) {
        scores[shop] += selected.points[shop];
    }

    // disable answer buttons briefly to avoid double clicks
    const buttons = document.querySelectorAll('#answers button');
    buttons.forEach(b => b.disabled = true);

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 220);
}

function showResult() {
    // prepare sorted list of shops by score
    const list = Object.keys(scores).map(k => ({ key: k, score: scores[k] }));
    list.sort((a, b) => b.score - a.score);

    document.getElementById("question").innerText = "Ergebnis";
    document.getElementById("answers").innerHTML = "";

    const resultDiv = document.getElementById("result");
    const recDiv = document.getElementById("recommendations");
    resultDiv.innerHTML = `<p class=\"h5\">Top-Empfehlung: <strong>${shopMeta[list[0].key].display}</strong></p>`;

    // show top 3 recommendations with links
    recDiv.innerHTML = "";
    const topN = Math.min(3, list.length);
    for (let i = 0; i < topN; i++) {
        const item = list[i];
        const meta = shopMeta[item.key] || { display: item.key, page: '#' };

        const wrap = document.createElement('div');
        wrap.className = 'rec-item';

        const left = document.createElement('div');
        left.className = 'rec-left';
        const img = document.createElement('img');
        img.src = meta.img;
        img.alt = meta.display + ' Logo';
        left.appendChild(img);
        const title = document.createElement('div');
        title.innerHTML = `<strong>${meta.display}</strong> <div class=\"rec-score\">Punkte: ${item.score}</div>`;
        left.appendChild(title);

        const right = document.createElement('div');
        const link = document.createElement('a');
        link.href = meta.page;
        link.className = 'btn btn-sm btn-outline-primary btn-shoplink';
        link.innerText = 'Mehr erfahren';
        right.appendChild(link);

        wrap.appendChild(left);
        wrap.appendChild(right);

        recDiv.appendChild(wrap);
    }

    // show restart
    if (restartBtn) {
        restartBtn.classList.remove('d-none');
        restartBtn.onclick = () => {
            // reset
            for (const k in scores) scores[k] = 0;
            currentQuestion = 0;
            document.getElementById('result').innerHTML = '';
            document.getElementById('recommendations').innerHTML = '';
            // reset progress bar
            if (progressBar) progressBar.style.width = '0%';
            restartBtn.classList.add('d-none');
            loadQuestion();
        };
    }

    // ensure progress shows complete
    if (progressBar) progressBar.style.width = '100%';
}

loadQuestion();

// safety: if progressBar not present, try to find after DOM
if (!progressBar) {
    const pb = document.getElementById('progressBar');
    if (pb) progressBar = pb;
}