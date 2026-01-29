let magento = 0;
let opencart = 0;
let prestashop = 0;
let shopware = 0;
let sylius = 0;
let woocommerce = 0;

let currentQuestion = 0;

const questions = [
    {
        text: "Wie groß soll dein Shop sein?",
        answers: [
            { label: "Klein", points: { woocommerce: 2, opencart: 1 }},
            { label: "Mittel", points: { prestashop: 2, shopware: 2 }},
            { label: "Groß", points: { magento: 3, sylius: 2 }}
        ]
    },
    {
        text: "Wie technisch bist du?",
        answers: [
            { label: "Anfänger", points: { woocommerce: 2, opencart: 2 }},
            { label: "Fortgeschritten", points: { prestashop: 2, shopware: 2 }},
            { label: "Profi", points: { magento: 3, sylius: 3 }}
        ]
    }
];

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").innerText = q.text;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.innerText = answer.label;
        btn.onclick = () => selectAnswer(index);
        btn.className = "btn btn-primary m-2";
        answersDiv.appendChild(btn);
    });
}

function selectAnswer(answerIndex) {
    const selected = questions[currentQuestion].answers[answerIndex];

    for (const shop in selected.points) {
        window[shop] += selected.points[shop];
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const scores = {
        Magento: magento,
        OpenCart: opencart,
        PrestaShop: prestashop,
        Shopware: shopware,
        Sylius: sylius,
        WooCommerce: woocommerce
    };

    let bestShop = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );

    document.getElementById("question").innerText = "Fertig!";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("result").innerText =
        "Empfohlener Shop: " + bestShop;
}

loadQuestion();
