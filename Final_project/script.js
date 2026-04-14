// Store quiz questions and track current question
let questions = [];
let currentQuestion = 0;
let score = 0; // Track score

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

  // Reset selection state for new question
  selected = false;

  // Create buttons for each answer option
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(btn, option);
    answersDiv.appendChild(btn);
  });

  document.getElementById("feedback").textContent = "";

  // Navigation button visibility
  document.getElementById("prevBtn").style.display =
    currentQuestion === 0 ? "none" : "inline-block";

  document.getElementById("nextBtn").style.display =
    currentQuestion === questions.length - 1 ? "none" : "inline-block";

  document.getElementById("finishBtn").style.display =
    currentQuestion === questions.length - 1 ? "inline-block" : "none";
}

// Prevent multiple selections
let selected = false;

// Handle answer selection
function selectAnswer(button, selectedAnswer) {
  if (selected) return;
  selected = true;

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

  // Score update
  if (selectedAnswer === correctAnswer) {
    score++;
  }

  showFeedback(selectedAnswer === correctAnswer);
}

// Show correct/incorrect message
function showFeedback(isCorrect) {
  const feedback = document.getElementById("feedback");

  if (isCorrect) {
    feedback.textContent = "Correct!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "Wrong!";
    feedback.style.color = "red";
  }
}

// ---------------------------
// OWEN'S ADDITIONS BELOW
// ---------------------------

// Navigation: Next Question
document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
});

// Navigation: Previous Question
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

// Final Results Screen
document.getElementById("finishBtn").addEventListener("click", () => {
  showResults();
});

function showResults() {
  const container = document.getElementById("quiz-container");

  container.innerHTML = `
    <h2>Final Results</h2>
    <p>You scored ${score} out of ${questions.length}</p>

    <h3>Correct Answers:</h3>
    <ul>
      ${questions
        .map(q => `<li>${q.question} — <strong>${q.answer}</strong></li>`)
        .join("")}
    </ul>

    <button onclick="location.reload()">Retry Quiz</button>
  `;
}
