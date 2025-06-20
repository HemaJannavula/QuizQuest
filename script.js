const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const startScreen = document.getElementById("start-screen");
const resultScreen = document.getElementById("result-screen");
const finalScoreElement = document.getElementById("final-score");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
      { text: "Berlin", correct: false },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: false }
    ]
  },
  {
    question: "What language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "JQuery", correct: false },
      { text: "CSS", correct: true },
      { text: "XML", correct: false }
    ]
  }
];

startBtn.addEventListener("click", startGame);

function startGame() {
  startScreen.classList.add("hide");
  quizContainer.classList.remove("hide");
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.innerText = "Score: 0";
  startTimer();
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  answerButtons.innerHTML = "";
  clearInterval(timer);
  timeLeft = 15;
  timerElement.innerText = "Time: 15";
  startTimer();
}

function selectAnswer(answer) {
  if (answer.correct) {
    score += 10;
    scoreElement.innerText = `Score: ${score}`;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        endGame();
      }
    }
  }, 1000);
}

function endGame() {
  quizContainer.classList.add("hide");
  resultScreen.classList.remove("hide");
  finalScoreElement.innerText = score;
}
