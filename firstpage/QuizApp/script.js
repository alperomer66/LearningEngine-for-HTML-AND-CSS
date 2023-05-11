const questions = [
    {
        question: "Какво е HTML?",
        answers: [
            { text: "Hyper transfer markup language", correct: false },
            { text: "Hyper text markup language", correct: true },
            { text: "Hyper transaction markup language", correct: false },
            { text: "Hyper transform markup language", correct: false },
        ],
    },
    {
        question: "Какво означава CSS?",
        answers: [
            { text: "Colorful Style Sheet", correct: false },
            { text: "Cascading Style Sheet", correct: true },
            { text: "Computer Style Sheet", correct: false },
            { text: "Creative Style Sheet", correct: false },
        ],
    },
    {
        question: "Кой HTML таг създава нов ред?",
        answers: [
            { text: "< a>", correct: false },
            { text: "< tr>", correct: false },
            { text: "< img/>", correct: false },
            { text: "< br/>", correct: true },
        ],
    },
    {
        question: "Как можем да променим цвета на фона на елемент?",
        answers: [
            { text: "background-color", correct: true },
            { text: "color", correct: false },
            { text: "A & B", correct: false },
            { text: "Нито едно от изброените", correct: false },
        ]
    },
    {
        question: "Как можем да променим цвета на текста на елемент?",
        answers: [
            { text: "background-color", correct: false },
            { text: "A & B", correct: false },
            { text: "color", correct: true },
            { text: "Нито едно от изброените", correct: false },
        ],
    },
    {
        question: "Кой HTML таг се използва за деклариране на вътрешен CSS?",
        answers: [
            { text: "< style>", correct: true },
            { text: "< link>", correct: false },
            { text: "< script>", correct: false },
            { text: "Нито едно от изброените", correct: false },
        ],
    },
    {
        question: "Как можем да пишем коментари в CSS?",
        answers: [
            { text: "//", correct: false },
            { text: "/* */", correct: true },
            { text: "#", correct: false },
            { text: "Всички изброени", correct: false },
        ],
    },
    {
        question: "Кое от следните свойства се използва за подравняване на текст в CSS?",
        answers: [
            { text: "text-alignment", correct: false },
            { text: "text-position", correct: false },
            { text: "text", correct: false },
            { text: "text-align", correct: true },
        ],
    },
    {
        question: "Кое от следните свойства се използва за промяна на шрифта на текст?",
        answers: [
            { text: "font-size", correct: false },
            { text: "font-family", correct: true },
            { text: "text-align", correct: false },
            { text: "None", correct: false },
        ],
    },
    {
        question: "Кой HTML елемент се използва за дефиниране на данни за описание?",
        answers: [
            { text: "< li>", correct: false },
            { text: "< dl>", correct: false },
            { text: "< ol>", correct: false },
            { text: "< dd>", correct: true },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", SelectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function SelectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `Резултатът ти е ${score} от ${questions.length}!`;
    if (score <= 7) {
        questionElement.innerHTML = `Резултатът ти е ${score} от ${questions.length} -
        Трябва да опиташ пак!`;
    } else {
        questionElement.innerHTML = `Резултатът ти е ${score} от ${questions.length} -
        Ти успя! Доказа че и сам войнът е войн!`;
    }
    nextButton.innerHTML = "Опитай пак!";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
