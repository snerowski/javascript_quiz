const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionsContainerEl = document.getElementById('questionsCon');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const scoreText = document.getElementById('score');


let shuffledQuestions, currentQuestionIndex = 0, timeLeft, score, timer;


const questions = [
  {
    question: 'Which is a function?',
    answers: [
      { text: 'funcion()', correct: true },
      { text: 'method()', correct: false },
      { text: 'variable()', correct: false },
      { text: 'class()', correct: false }
    ]
  },
  {
    question: 'Who made this test?',
    answers: [
      { text: 'Reggie', correct: true },
      { text: 'The professor', correct: false },
      { text: 'Some rando on stack overflow', correct: false },
      { text: 'Some student I paid', correct: false }
    ]
  },
  {
    question: 'Best coffee?',
    answers: [
      { text: 'Latte', correct: false },
      { text: 'Black', correct: true },
      { text: 'Espresso', correct: false },
      { text: 'Mocha', correct: false }
    ]
  },
  {
    question: 'Best Ice Cream?',
    answers: [
      { text: 'Chocolate', correct: false },
      { text: 'Cookies and Cream', correct: true },
      { text: 'Mint Chocolate Chip', correct: false },
      { text: 'Strawberry', correct: false }
    ]
  }
];

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    nextQuestion();
});

// Timer
function startTimer(duration, display) {
  timeLeft = duration;
  timer = setInterval(function() {
    timeLeft--;
    display.textContent = formatTime(timeLeft);
    if (timeLeft === 0) {
      clearInterval(timer);
      alert('Game Over!');
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Start The Questions
function startGame() {
  score = 0;
  startButton.classList.add('hide');
  shuffledQuestions = shuffleQuestions(questions);
  questionsContainerEl.classList.remove('hide');
  currentQuestionIndex = 0;
  timeElement.classList.remove('hide');
  scoreElement.innerText = 'Score: 0';
  nextQuestion();
  nextButton.classList.remove('hide');
  startTimer(120, timeElement);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  answerButtonsElement.innerHTML = '';
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.text;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
      score += 10;
      scoreText.innerText = score;
    } else {
      timeLeft -= 10;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      startButton.innerText = 'Restart';
      startButton.classList.remove('hide');
    }
  }
  
  

  


function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }
  

function clearStatusClass(element) {
element.classList.remove('correct');
element.classList.remove('wrong');
}

function shuffleQuestions(questions) {
return questions.sort(() => Math.random() - 0.5);
}

function nextQuestion() {
    console.log('currentQuestionIndex:', currentQuestionIndex);

showQuestion(shuffledQuestions[currentQuestionIndex]);
nextButton.classList.add('hide');
}

startGame();




