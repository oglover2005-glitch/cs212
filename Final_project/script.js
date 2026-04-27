document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
});

// Store quiz questions and track current question
let questions = [];
let currentQuestion = 0;
let selected = false;

function updateStartScreenBestScore() {
  let bestScore = localStorage.getItem("bestScore");
  if (bestScore !== null) {
    document.getElementById("bestScoreStart").textContent =
      `Best score: ${bestScore}/${questions.length}`;
  }
}

// Load questions from JSON file
fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadQuestion();
    updateStartScreenBestScore();
  });

// Display the current question and its answers
function loadQuestion() {
  const q = questions[currentQuestion];

  //update question counter
  document.getElementById("questionCounter").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;
 
  document.getElementById("question").textContent = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  // Clear any leftover highlight classes
document.querySelectorAll("#answers button").forEach(btn => {
    btn.classList.remove("correct", "wrong");
});

// Create buttons for each answer option
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(btn, option);
    answersDiv.appendChild(btn);
  });

  document.getElementById("feedback").textContent = "";
}




// Handle answer selection
function selectAnswer(button, selectedAnswer) {
  if (selected) return;
  selected = true;
questions[currentQuestion].userAnswer = selectedAnswer;

  const correctAnswer = questions[currentQuestion].answer;
  const buttons = document.querySelectorAll("#answers button");
  // Highlight answers and disable buttons
  buttons.forEach(btn => {
    btn.disabled = true; 

    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
  });

  showFeedback(selectedAnswer === correctAnswer);
}

// Show correct/incorrect message
function showFeedback(isCorrect) {
  const feedback = document.getElementById("feedback");

  if (isCorrect) {
    feedback.textContent = "Correct!";
  } else {
    feedback.textContent = "Wrong!";
  }
}
// NEXT BUTTON LOGIC
document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    selected = false;
    loadQuestion();
  }
});

// FINISH BUTTON LOGIC
document.getElementById("finishBtn").addEventListener("click", () => {
// Calculate score
let score = 0;
questions.forEach(q => {
  if (q.userAnswer === q.answer) {
    score++;
  }
});

// Save latest score
localStorage.setItem("latestScore", score);

// Retrieve best score
let bestScore = localStorage.getItem("bestScore");

// Update best score if needed
if (bestScore === null || score > bestScore) {
  bestScore = score;
  localStorage.setItem("bestScore", bestScore);
}

// Update UI
document.getElementById("scoreText").textContent =
  `Your score: ${score}/${questions.length}`;

document.getElementById("bestScoreText").textContent =
  `Best score: ${bestScore}/${questions.length}`;


  const answerList = document.getElementById("answerList");
  answerList.innerHTML = "";

  questions.forEach(q => {
    const li = document.createElement("li");
    li.textContent = `${q.question} — Correct answer: ${q.answer}`;
    answerList.appendChild(li);
  });

  // Switch screens
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("results-screen").style.display = "block";
});

// PREVIOUS BUTTON LOGIC
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    selected = false;
    loadQuestion();
  }
});
// RETRY BUTTON LOGIC
document.getElementById("retryBtn").addEventListener("click", () => {
  currentQuestion = 0;
  selected = false;
// Clear any leftover highlight classes
document.querySelectorAll("#answers button").forEach(btn => {
    btn.classList.remove("correct", "wrong");
    btn.disabled = false;
});

  // Clear stored answers
  questions.forEach(q => q.userAnswer = null);
updateStartScreenBestScore();

  // Switch screens
  document.getElementById("results-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
  loadQuestion();
});
