// ------------------------------------------------------
// HW7 — GREETING + RESUME ALERT
// ------------------------------------------------------

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

let hasDownloadedResume = false;


// ------------------------------------------------------
// HW8 — RESUME COUNTER
// ------------------------------------------------------

let resumeDownloadCount = 0;

$("#resumeBtn").click(function () {
  if (!hasDownloadedResume) {
    setTimeout(() => alert("Your resume is downloaded successfully!"), 2000);
    hasDownloadedResume = true;
  }

  resumeDownloadCount++;
  $("#downloadCount").text(resumeDownloadCount);
});


// ------------------------------------------------------
// HW8 — EDUCATION & EXPERIENCE TABLES
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
// HW9 — DYNAMIC NAVIGATION
// ------------------------------------------------------

const navItems = ["About", "Skills", "Projects", "Education", "Contact"];

function renderNav() {
  $("#navList").empty();

  navItems.forEach(item => {
    $("#navList").append(`
      <li class="nav-item">
        <a class="nav-link" href="#${item.toLowerCase()}">${item}</a>
      </li>
    `);
  });

  $(".nav-link").click(function (e) {
    e.preventDefault();
    const target = $(this).attr("href");
    $("html, body").animate(
      { scrollTop: $(target).offset().top - 60 },
      500
    );
  });
}

renderNav();


// ------------------------------------------------------
// HW9 — SKILLS (ADD, EDIT, DELETE, ANIMATE)
// ------------------------------------------------------

let skills = [];
let editingIndex = -1;

function renderSkills() {
  $("#skillsList").empty();

  skills.forEach((skill, index) => {
    $("#skillsList").append(`
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="skill-text" data-index="${index}">${skill}</span>
        <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">X</button>
      </li>
    `);
  });

  // Edit skill
  $(".skill-text").click(function () {
    editingIndex = $(this).data("index");
    $("#skillInput").val(skills[editingIndex]).focus();
  });

  // Delete skill
  $(".delete-btn").click(function () {
    const i = $(this).data("index");
    $(this).closest("li").slideUp(200, () => {
      skills.splice(i, 1);
      renderSkills();
    });
  });
}

function addOrEditSkill() {
  const text = $("#skillInput").val().trim();
  if (text === "") return;

  if (skills.includes(text) && editingIndex === -1) return;

  if (editingIndex === -1) {
    skills.push(text);
  } else {
    skills[editingIndex] = text;
    editingIndex = -1;
  }

  $("#skillInput").val("");
  renderSkills();
}

$("#addSkillBtn").click(addOrEditSkill);

$("#skillInput").keydown(function (e) {
  if (e.key === "Enter") addOrEditSkill();
  if (e.key === "Escape") {
    $("#skillInput").val("");
    editingIndex = -1;
  }
});


// ------------------------------------------------------
// HW9 — PROJECTS + SORTING
// ------------------------------------------------------

let projects = [
  {
    title: "Robotic Coding",
    description: "Programming robots to perform tasks and respond to sensors.",
    deadline: "2026-05-01",
    image: "https://picsum.photos/300?1"
  },
  {
    title: "Turtle Art Projects",
    description: "Creative visual programming using Python’s turtle module.",
    deadline: "2025-12-31",
    image: "https://picsum.photos/300?2"
  },
  {
    title: "Personal Website",
    description: "This portfolio website built with HTML, CSS, and JavaScript.",
    deadline: "2026-04-30",
    image: "https://picsum.photos/300?3"
  }
];

function renderProjects() {
  $("#projectCards").empty();

  projects.forEach(p => {
    $("#projectCards").append(`
      <div class="col-md-4">
        <div class="card project-card">
          <img src="${p.image}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${p.title}</h5>
            <p class="card-text">${p.description}</p>
            <p class="text-muted">Deadline: ${p.deadline}</p>
          </div>
        </div>
      </div>
    `);
  });

  $(".project-card").hide().fadeIn(400);
}

renderProjects();

$("#sortBtn").click(() => {
  projects.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  renderProjects();
});


// ------------------------------------------------------
// HW8 + HW9 INITIALIZATION
// ------------------------------------------------------

$(document).ready(function () {
  updateGreeting();
  renderTables();
});
