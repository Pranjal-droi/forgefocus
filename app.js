// app.js

document.addEventListener("DOMContentLoaded", () => {
  highlightActiveNav();

  const path = window.location.pathname;

  if (path.includes("index.html") || path === "/") {
    initHomePage();
  } else if (path.includes("dashboard.html")) {
    initDashboard();
  } else if (path.includes("features.html")) {
    console.log("Features page loaded");
  } else if (path.includes("contact.html")) {
    initContactForm();
  } else if (path.includes("login.html") || path.includes("signup.html")) {
    initAuthForm();
  }
});

// 🔗 Highlight current active nav link
function highlightActiveNav() {
  const links = document.querySelectorAll("nav a");
  const current = window.location.pathname;

  links.forEach((link) => {
    if (link.href.includes(`${current}`)) {
      link.style.color = "#f06292"; // Accent color
      link.style.fontWeight = "600";
    }
  });
}

// 🏠 Home Page Logic
function initHomePage() {
  const loginBtn = document.querySelector(".login-btn");
  const signupBtn = document.querySelector(".signup-btn");

  if (loginBtn && signupBtn) {
    loginBtn.addEventListener("click", () => {
      alert("Redirecting to Login Page (not yet connected)");
    });

    signupBtn.addEventListener("click", () => {
      alert("Redirecting to Sign-Up Page (not yet connected)");
    });
  }
}

// 📊 Dashboard Demo
function initDashboard() {
  const stats = {
    pomodoros: 5,
    streak: 4,
    tasks: 8
  };

  const container = document.querySelector(".container");
  if (container) {
    const newStats = document.createElement("div");
    newStats.style.marginTop = "30px";
    newStats.innerHTML = `
      <h2>Today's Stats</h2>
      <ul>
        <li>✅ Pomodoros: ${stats.pomodoros}</li>
        <li>🔥 Streak: ${stats.streak} days</li>
        <li>🎯 Tasks Completed: ${stats.tasks}/10</li>
      </ul>
    `;
    container.appendChild(newStats);
  }
}

// 📩 Contact Form Validation
function initContactForm() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const message = form.querySelector("#message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields!");
      return;
    }

    alert("Message sent successfully! 🚀 (simulation)");
    form.reset();
  });
}

// 🔐 Login / Signup
function initAuthForm() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector("input[type='email']").value.trim();
    const password = form.querySelector("input[type='password']").value.trim();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    alert("Login/Signup successful! 🎉 (simulation)");
    form.reset();
  });
}
