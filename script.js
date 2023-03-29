const startBtn = document.querySelector("#start-btn");
const quiz = document.querySelector("#quiz");
const answearBtns = document.querySelectorAll(".ans");
const logoImg = document.querySelector("#logo-img");
const question = document.querySelector("#question");
const nextBtn = document.querySelector("#next-btn");

const questions = [
  {
    correct: "Alfa Romeo",
    incorrect: ["Fiat", "Ferrai", "Lamborghini"],
  },
  {
    correct: "Ferrari",
    incorrect: ["Fiat", "Alfa Romeo", "Lamborghini"],
  },
  {
    correct: "Audi",
    incorrect: ["BMW", "Mercedes-Benz", "Volkswagen"],
  },
  {
    correct: "Mercedes-Benz",
    incorrect: ["BMW", "Audi", "Volkswagen"],
  },
  {
    correct: "Bentley",
    incorrect: ["Bugatti", "BMW", "Rolls-Royce"],
  },
  {
    correct: "Volkswagen",
    incorrect: ["BMW", "Audi", "Mercedes-Benz"],
  },
  {
    correct: "Opel",
    incorrect: ["Volkswagen", "Citroën", "Renault"],
  },

  {
    correct: "Renault",
    incorrect: ["Peugeot", "Citroën", "Alpine"],
  },
  {
    correct: "Mitsubishi",
    incorrect: ["Mazda", "Toyota", "Honda"],
  },
  {
    correct: "Polestar",
    incorrect: ["Volvo", "Saab", "Koenigsegg"],
  },
  {
    correct: "Polestar",
    incorrect: ["Volvo", "Saab", "Koenigsegg"],
  },
];

let current = 0;
let random;
let correctAnswear = 0;

const renderQuestion = function (arr) {
  const randomAnswears = [arr[current].correct, ...arr[current].incorrect].sort(
    (a, b) => Math.random() - 0.5
  );
  answearBtns.forEach((btn, i) => {
    btn.textContent = randomAnswears[i];
  });
  logoImg.src = `logos/${arr[current].correct.toLowerCase()}.svg`;
};

const startQuiz = function (arr) {
  random = arr.sort((a, b) => Math.random() - 0.5);
  startBtn.classList.add("hide");
  quiz.classList.remove("hide");
  renderQuestion(random);
};

startBtn.addEventListener("click", () => {
  startQuiz(questions);
});

const checkQuestion = function (arr, btn) {
  if (btn.textContent === arr[current].correct) {
    correctAnswear++;
    btn.classList.add("correct");
    question.textContent = "Correct!";
  } else {
    btn.classList.add("incorrect");
    question.textContent = `It appears to be a mistake. Correct answear is ${arr[current].correct}.`;
  }
  current++;
  console.log(current);
  nextBtn.classList.remove("hide");
};

answearBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    checkQuestion(random, e.target);
  })
);

const endQuiz = function (arr) {
  startBtn.classList.remove("hide");
  quiz.classList.add("hide");
  nextBtn.classList.add("hide");
  question.textContent = `Your score is ${Math.round(
    (correctAnswear / arr.length) * 100
  )}%`;
  current = 0;
  random = arr.sort((a, b) => Math.random() - 0.5);
  correctAnswear = 0;
};

const nextQuestion = function (arr) {
  if (current === arr.length) endQuiz(arr);
  nextBtn.classList.add("hide");
  answearBtns.forEach((btn) => btn.classList.remove("correct", "incorrect"));
  renderQuestion(arr);
};

nextBtn.addEventListener("click", () => {
  nextQuestion(random);
});
