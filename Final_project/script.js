document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
});

// Store quiz questions and track current question
let questions = [];
let currentQuestion = 0;

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
