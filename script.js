// Gets all of the DOM elements
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionsContainerEl = document.getElementById('questionsCon');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const scoreText = document.getElementById('score');

// Initializes the variables
let shuffledQuestions, currentQuestionIndex = 0, timeLeft, score, timer;

// Where all of the questions and answers for the quiz are stored
const questions = [
  {
    question: 'What does the funtion skeleton look like?',
    answers: [
      { text: 'function()', correct: true },
      { text: 'method()', correct: false },
      { text: 'variable()', correct: false },
      { text: 'class()', correct: false }
    ]
  },
  {
    question: 'What does getElementById do?',
    answers: [
      { text: 'Returns an object', correct: true },
      { text: 'Creates a new element', correct: false },
      { text: 'Finds your social security number', correct: false },
      { text: 'All of the above', correct: false }
    ]
  },
  {
    question: 'What is an add event listner?',
    answers: [
      { text: 'Sets up a function that will be called whenever the specified event is delivered to the target', correct: false },
      { text: 'A fun event where you get to listen', correct: true },
      { text: 'Something on spotify', correct: false },
      { text: 'All of the above', correct: false }
    ]
  },
  {
    question: 'What do arrays do?',
    answers: [
      { text: 'Store multiple values in a single variable', correct: false },
      { text: 'Makes a row', correct: true },
      { text: 'Changes the users path', correct: false },
      { text: 'All of the above', correct: false }
    ]
  }
];
// Starts the quiz 
startButton.addEventListener('click', startGame);
// Goes to the next question, I kept breaking the code when I tried to get it to go to the next question after the user has selected an answer so i just settled for clicking next question
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    nextQuestion();
});

// Timer starts once the quiz starts
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
// Once the user selects an answer if its correct it adds 10 points, if its incorrect it subtracts 10 seconds from the timer. If time runs out alert window appears and says game over
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
  
  

  

// This function sets the class of the provided element based on whether the answer is correct or wrong.
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }
  
// This function removes the 'correct' and 'wrong' classes from the provided element.
function clearStatusClass(element) {
element.classList.remove('correct');
element.classList.remove('wrong');
}
// just shuffles the questions each time the quiz is taken 
function shuffleQuestions(questions) {
return questions.sort(() => Math.random() - 0.5);
}
// This function displays the next question in the shuffledQuestions array.
function nextQuestion() {
    console.log('currentQuestionIndex:', currentQuestionIndex);
// Hide the next button until an answer has been selected.
showQuestion(shuffledQuestions[currentQuestionIndex]);
nextButton.classList.add('hide');
}
// Starts the quiz when the page loads.
startGame();




