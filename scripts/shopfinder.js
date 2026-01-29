let scores = {
    magento: 0,
    opencart: 0,
    prestashop: 0,
    shopware: 0,
    sylius: 0,
    woocommerce: 0
};

let currentQuestion = 0;

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
    const q = questions[currentQuestion];
    document.getElementById("question").innerText = q.text;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.innerText = answer.label;
        btn.className = "btn btn-primary m-2";
        btn.onclick = () => selectAnswer(index);
        answersDiv.appendChild(btn);
    });
}

function selectAnswer(answerIndex) {
    const selected = questions[currentQuestion].answers[answerIndex];

    for (const shop in selected.points) {
        scores[shop] += selected.points[shop];
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    let bestShop = "";
    let bestScore = -1;

    for (const shop in scores) {
        if (scores[shop] > bestScore) {
            bestScore = scores[shop];
            bestShop = shop;
        }
    }

    document.getElementById("question").innerText = "Ergebnis";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("result").innerText =
        "Empfohlener Shop: " + bestShop.toUpperCase();
}

loadQuestion();
