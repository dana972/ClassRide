// Connect to the WebSocket server

// Example: Attach event listeners to bus request buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".request-bus-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const studentName = "John Doe"; // Replace this with actual student data
      const busId = button.getAttribute("data-bus-id"); // Get the bus ID from button attribute
      sendBusRequest(studentName, busId);
    });
  });
});
