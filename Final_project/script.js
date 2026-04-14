document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
});

// Store quiz questions and track current question
let questions = [];
let currentQuestion = 0;
let selected = false;
// Load questions from JSON file
fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadQuestion();
  });

// Display the current question and its answers
function loadQuestion() {
  const q = questions[currentQuestion];

  document.getElementById("question").textContent = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
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

  // Loop through all questions and count correct answers
  questions.forEach((q, index) => {
    if (q.userAnswer === q.answer) {
      score++;
    }
  });

  // Update results screen
  document.getElementById("scoreText").textContent =
    `Your score: ${score}/${questions.length}`;

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
