const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

// Toggle between login and signup forms
registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// Signup form functionality
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form refresh
  const name = document.getElementById("signup-fullname").value;
  const phone = document.getElementById("signup-phone").value; // Updated field
  const password = document.getElementById("signup-password").value;

  console.log("Submitting signup form..."); // Debugging log

  try {
    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, password }), // Updated field
    });

    const data = await response.json();
    console.log("Signup response:", data); // Debugging log

    if (response.ok) {
      alert("Signup successful! Please log in.");
      container.classList.remove("active"); // Switch to login form
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Signup error:", error);
  }
});

// Login form functionality
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const phone = document.getElementById("login-phone").value; // Updated field
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }), // Updated field
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login successful!");

      // Store user info in localStorage
      localStorage.setItem("userPhone", data.phone); // Store phone instead of user_id
      localStorage.setItem("userRole", data.role); // Store user role
      localStorage.setItem("userName", data.name); // Store user name

      // Redirect based on role
      if (data.role === "owner") {
        window.location.href = "owner-dashboard.html";
      } else if (data.role === "driver") {
        window.location.href = "driver.html";
      } else if (data.role === "student") {
        window.location.href = "student.html"; // Redirect students to student page
      } else {
        alert("Role not recognized.");
      }
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
  }
});
