// ------------------------------------------------------
// HW7 FEATURES (Kept exactly as before)
// ------------------------------------------------------

// Greeting based on time of day
function updateGreeting() {
  const greetingEl = document.getElementById("greeting");
  if (!greetingEl) return;

  const hour = new Date().getHours();
  let greeting = "Hello";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  greetingEl.textContent = `${greeting}, Owen!`;
}

// Days until deadline function (HW7)
function daysUntil(dateString) {
  const today = new Date();
  const target = new Date(dateString);
  const diff = target - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

console.log("Hello World!");
console.log("Days until deadline:", daysUntil("2026-04-15"));

// Resume alert (HW7)
let hasDownloadedResume = false;


// ------------------------------------------------------
// HW8 STEP 1 — Add Skills From Input
// ------------------------------------------------------

const skillsList = document.getElementById("skillsList");
const newSkillInput = document.getElementById("newSkillInput");
const addSkillBtn = document.getElementById("addSkillBtn");

if (addSkillBtn) {
  addSkillBtn.addEventListener("click", function () {
    const skillText = newSkillInput.value.trim();
    if (skillText === "") return;

    const col = document.createElement("div");
    col.className = "col-md-4";

    const card = document.createElement("div");
    card.className = "card p-3 text-center fw-bold";
    card.textContent = skillText;

    col.appendChild(card);
    skillsList.appendChild(col);

    newSkillInput.value = "";
  });
}


// ------------------------------------------------------
// HW8 STEPS 2 & 3 — Project Arrays + Loop + Status
// ------------------------------------------------------

const projectTitles = [
  "Robotic Coding",
  "Turtle Art Projects",
  "Personal Website"
];

const projectDescriptions = [
  "Programming robots to perform tasks and respond to sensors.",
  "Creative visual programming using Python’s turtle module.",
  "This portfolio website built with HTML, CSS, and JavaScript."
];

const projectDeadlines = [
  "2026-05-01", // future
  "2025-12-31", // past
  "2026-04-30"  // future
];

function getProjectStatus(deadline) {
  const today = new Date();
  const dueDate = new Date(deadline);

  if (dueDate > today) return "Ongoing";
  if (dueDate < today) return "Completed";
  return "Due Today";
}

function renderProjects() {
  const container = document.getElementById("projectsContainer");
  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < projectTitles.length; i++) {
    const col = document.createElement("div");
    col.className = "col-md-4";

    const card = document.createElement("div");
    card.className = "card";

    const body = document.createElement("div");
    body.className = "card-body";

    const titleEl = document.createElement("h5");
    titleEl.className = "card-title";
    titleEl.textContent = projectTitles[i];

    const descEl = document.createElement("p");
    descEl.textContent = projectDescriptions[i];

    const deadlineEl = document.createElement("p");
    deadlineEl.textContent = "Deadline: " + projectDeadlines[i];

    const statusEl = document.createElement("span");
    statusEl.className = "badge bg-info text-dark";
    statusEl.textContent = getProjectStatus(projectDeadlines[i]);

    body.appendChild(titleEl);
    body.appendChild(descEl);
    body.appendChild(deadlineEl);
    body.appendChild(statusEl);

    card.appendChild(body);
    col.appendChild(card);
    container.appendChild(col);
  }
}


// ------------------------------------------------------
// HW8 STEP 4 — Resume Download Counter
// ------------------------------------------------------

let resumeDownloadCount = 0;
const downloadCountEl = document.getElementById("downloadCount");

const resumeBtn = document.getElementById("resumeBtn");
if (resumeBtn) {
  resumeBtn.addEventListener("click", function () {

    // HW7: One-time delayed alert
    if (!hasDownloadedResume) {
      setTimeout(() => {
        alert("Your resume is downloaded successfully!");
      }, 2000);
      hasDownloadedResume = true;
    }

    // HW8: Count every download
    resumeDownloadCount++;
    if (downloadCountEl) {
      downloadCountEl.textContent = resumeDownloadCount;
    }
  });
}


// ------------------------------------------------------
// HW8 STEP 5 — Dynamic Tables (Education & Experience)
// ------------------------------------------------------

const educationData = [
  { school: "NAU", role: "Cybersecurity Major", start: "2024", end: "Present" },
  { school: "High School", role: "National Honor Society", start: "2018", end: "2022" }
];

const experienceData = [
  { place: "IN-N-OUT Burger", role: "Customer Service", start: "2021", end: "2024" },
  { place: "Car Wash Detailing", role: "Detailer", start: "Summer 2025", end: "Summer 2025" }
];

function createTable(headers, data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const table = document.createElement("table");
  table.className = "table table-bordered table-striped";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  headers.forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    headRow.appendChild(th);
  });

  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  data.forEach(row => {
    const tr = document.createElement("tr");
    Object.values(row).forEach(value => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

function renderTables() {
  createTable(
    ["School / University", "Role / Degree", "Start", "End"],
    educationData,
    "educationTableContainer"
  );

  createTable(
    ["Company / Organization", "Role / Job Title", "Start", "End"],
    experienceData,
    "experienceTableContainer"
  );
}


// ------------------------------------------------------
// HW8 INITIALIZATION
// ------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  updateGreeting();
  renderProjects();
  renderTables();
});
// ------------------------------------------------------
// EXTRA CREDIT — DARK MODE TOGGLE
// ------------------------------------------------------

const darkToggle = document.getElementById("darkModeToggle");

if (darkToggle) {
  darkToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      darkToggle.textContent = "Light Mode";
      darkToggle.classList.remove("btn-light");
      darkToggle.classList.add("btn-dark");
    } else {
      darkToggle.textContent = "Dark Mode";
      darkToggle.classList.remove("btn-dark");
      darkToggle.classList.add("btn-light");
    }
  });
}
