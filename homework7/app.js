// -----------------------------
// HW7 – JavaScript Interactivity
// -----------------------------

// Step 1: Verify JS is connected
console.log("Hello World!");


// Step 3: Variables for user data
const name = "Owen Glover";
let hasDownloadedResume = false;


// Step 2: Resume download alert (only once)
document.getElementById("resumeBtn").addEventListener("click", function () {
    if (!hasDownloadedResume) {

        // BONUS: Delay alert by 2 seconds
        setTimeout(() => {
            alert("Your resume is downloaded successfully!");
        }, 2000);

        hasDownloadedResume = true;
    }
});


// Step 4: Greeting function
function showGreeting(name) {
    return "Hello, my name is " + name + "! Welcome to my portfolio!";
}


// BONUS: Time‑of‑day greeting
function timeGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning, Owen!";
    if (hour < 18) return "Good Afternoon, Owen!";
    return "Good Evening, Owen!";
}


// Display greeting on page load
document.getElementById("greetingMessage").textContent = timeGreeting();




// Step 5: Days‑until‑deadline function
function daysUntilDeadline(deadline) {
    const today = new Date();
    const dueDate = new Date(deadline);

    const difference = dueDate.getTime() - today.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));

    return days;
}


// Calculate and display days remaining
const deadline = document.getElementById("deadlineDate").textContent;
const daysLeft = daysUntilDeadline(deadline);

document.getElementById("daysLeft").textContent = daysLeft;
console.log("Days until deadline:", daysLeft);
