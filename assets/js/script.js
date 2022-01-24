var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("starter-container");
var containerEndEl = document.getElementById("end-container");
var containerScoreEl = document.getElementById("score-banner");
var formInitials = document.getElementById("initials-form");
var containerHighScoresEl = document.getElementById("high-score-container")
var ViewHighScoreEl = document.getElementById("view-high-scores");
var listHighScoreEl = document.getElementById("high-score-list");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");
// buttons
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back");
var btnClearScoresEl = document.querySelector("#clear-high-scores");
// questions & answers 
var questionEl = document.getElementById("question");
var answerbuttonsEl = document.getElementById("answer-buttons");
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;

var highScores = [];

var arrayShuffledQuestions;
var questionIndex = 0;



// questions array
var questions = [
  { q: 'What are HTML semantic elements?', 
    a: '4. A semantic element clearly describes its meaning to both the browser and the developer.', 
    choices: [{choice: '1. A semantic element reveals nothing about its content to the browser or the developer.'}, {choice: '2. Semantic elements are outdated and are no longer used in HTML.'}, {choice: '3. Semantic elements, like `<div>`, hold the important content together so its easy to understand'}, {choice: '4. A semantic element clearly describes its meaning to both the browser and the developer.'}]
  },
  { q: 'Given the following CSS selector, which HTML element would be the outermost/parent element? header nav ul li { color: white; }', 
    a: '3. <header>', 
    choices: [{choice: '1. <nav>'}, {choice: '2. <ls>'}, {choice: '3. <header>'}, {choice: '4. <ul>'}]
  },
  { q: 'When did javascript first appear?', 
    a: '1. 1995', 
    choices: [{choice: '1. 1995'}, {choice: '2. 1972'}, {choice: '3. 1984'}, {choice: '4. 2010'}]
  },
  { q: 'What does DOM stand for?', 
    a: '2. Document Object Model', 
    choices: [{choice: '1. Do Overnight Modules'}, {choice: '2. Document Object Model'}, {choice: '3. Digital Oblivious Meta'}, {choice: '4. Do'}]
  },
  { q: 'How would you create a box with rounded corners using CSS?', 
    a: '2. border-radius: 50px', 
    choices: [{choice: '1. transform: round(corner)'}, {choice: '2. border-radius: 50px;'}, {choice: '3. box-corner: round;'}, {choice: '4. corner-style: round;'}]
  },
];

//if go back button is clicked on high score page
var renderStartPage = function () {
    containerHighScoresEl.classList.add("hide")
    containerHighScoresEl.classList.remove("show")
    containerStartEl.classList.remove("hide")
    containerStartEl.classList.add("show")
    containerScoreEl.removeChild(containerScoreEl.lastChild)
    questionIndex = 0
    gameover = ""
    timerEl.textContent = 0 
    score = 0

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide")
    };
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    };
};

//every second, check if game-over is true, or if there is time left. Start time at 30. 
var setTime = function () {
    timeleft = 30;

var timercheck = setInterval(function() {
    timerEl.innerText = timeleft;
    timeleft--

    if (gameover) {
        clearInterval(timercheck)
    }

    if (timeleft < 0) {
        showScore()
        timerEl.innerText = 0
        clearInterval(timercheck)
    }

    },
    1000);
};

var startGame = function() {
    //add classes to show/hide start and quiz screen
    containerStartEl.classList.add('hide');
    containerStartEl.classList.remove('show');
    containerQuestionEl.classList.remove('hide');
    containerQuestionEl.classList.add('show');
    //Shuffle the questions so they show in random order
    arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
};

//set next question for quiz
var setQuestion = function() {
    resetAnswers()
    displayQuestion(arrayShuffledQuestions[questionIndex])
};

//remove answer buttons
var resetAnswers = function() {
    while (answerbuttonsEl.firstChild) {
        answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
};

// display question
var displayQuestion = function(index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", checkAnswer)
        answerbuttonsEl.appendChild(answerbutton)
        }
};

// display correct
var correctAnswer = function() {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide")
        correctEl.classList.add("banner")
        wrongEl.classList.remove("banner")
        wrongEl.classList.add("hide")
        }
};

// display wrong
var wrongAnswer = function() {
    if (wrongEl.className = "hide") {
        wrongEl.classList.remove("hide")
        wrongEl.classList.add("banner")
        correctEl.classList.remove("banner")
        correctEl.classList.add("hide")
    }
};

// check if answer is correct    
var checkAnswer = function(event) {
    var selectedanswer = event.target
        if (arrayShuffledQuestions[questionIndex].a === selectedanswer.innerText){
        correctAnswer()
            score = score + 10
        }

        else {
        wrongAnswer()
        timeleft = timeleft - 10;
};

// go to next question, check for more
questionIndex++
    if  (arrayShuffledQuestions.length > questionIndex + 1) {
        setQuestion()
    }   
    else {
        gameover = "true";
        showScore();
    }
};

// Display score screen at the end
var showScore = function () {
    containerQuestionEl.classList.add("hide");
    containerEndEl.classList.remove("hide");
    containerEndEl.classList.add("show");

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    containerScoreEl.appendChild(scoreDisplay);
};       

// create high score values
var createHighScore = function(event) { 
    event.preventDefault() 
    var initials = document.querySelector("#initials").value;
    if (!initials) {
    alert("Enter your intials!");
    return;
};

formInitials.reset();

var HighScore = {
initials: initials,
score: score
};

highScores.push(HighScore);
highScores.sort((a, b) => {return b.score-a.score});

while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild)
};

for (var i = 0; i < highScores.length; i++) {
var highscoreEl = document.createElement("li");
highscoreEl.ClassName = "high-score";
highscoreEl.innerHTML = highScores[i].initials + " - " + highScores[i].score;
listHighScoreEl.appendChild(highscoreEl);
};

saveHighScore();
displayHighScores();

};
//save high score
var saveHighScore = function () {
    localStorage.setItem("highScores", JSON.stringify(highScores))
      
};


var loadHighScore = function () {
    var loadedHighScores = localStorage.getItem("highScores")
        if (!loadedHighScores) {
        return false;
};

    loadedHighScores = JSON.parse(loadedHighScores);
    loadedHighScores.sort((a, b) => {return b.score-a.score})

    for (var i = 0; i < loadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerText = loadedHighScores[i].initials + " - " + loadedHighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);

        highScores.push(loadedHighScores[i]);
        
    }
};  

//display high scores
var displayHighScores = function() {

    containerHighScoresEl.classList.remove("hide");
    containerHighScoresEl.classList.add("show");
    gameover = "true"

    if (containerEndEl.className = "show") {
        containerEndEl.classList.remove("show");
        containerEndEl.classList.add("hide");
        }
    if (containerStartEl.className = "show") {
        containerStartEl.classList.remove("show");
        containerStartEl.classList.add("hide");
        }
        
    if (containerQuestionEl.className = "show") {
        containerQuestionEl.classList.remove("show");
        containerQuestionEl.classList.add("hide");
        }

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }

    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
        }
};

//clear high scores
var clearScores = function () {
    highScores = [];

    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    }

    localStorage.clear(highScores);

};

loadHighScore();
  
// start click, start game
btnStartEl.addEventListener("click", startGame);
// submit button
formInitials.addEventListener("submit", createHighScore);
//Go back button
btnGoBackEl.addEventListener("click", renderStartPage);
// view high-scores
ViewHighScoreEl.addEventListener("click", displayHighScores);
//clear scores button
btnClearScoresEl.addEventListener("click", clearScores);