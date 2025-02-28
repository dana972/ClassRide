const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// Signup form functionality
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form from refreshing the page

  const phone = document.getElementById("signup-phone").value;
  const password = document.getElementById("signup-password").value;
  const name = "New User"; // Optional: Add a name input in the form if needed

  console.log("Submitting signup form..."); // Debugging log
  console.log("Phone:", phone);
  console.log("Password:", password);

  try {
    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, password }),
    });

    const data = await response.json();
    console.log("Signup response:", data); // Debugging log

    if (response.ok) {
      alert("Signup successful! Please log in.");
      container.classList.remove("active"); // Switch to login form after successful signup
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Signup error:", error);
  }
});

// Login form functionality
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form from refreshing the page

  const phone = document.getElementById("login-phone").value;
  const password = document.getElementById("login-password").value;

  console.log("Submitting login form..."); // Debugging log
  console.log("Phone:", phone);
  console.log("Password:", password);

  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });

    const data = await response.json();
    console.log("Login response:", data); // Debugging log

    if (response.ok) {
      alert("Login successful!");
      // Redirect or store session data if needed
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
  }
});
