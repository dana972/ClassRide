const socket = io("http://localhost:5000");

const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatMessages = document.getElementById("chat-messages");

const typingIndicator = document.createElement("p");
typingIndicator.classList.add("typing");
typingIndicator.innerText = "Someone is typing...";
typingIndicator.style.display = "none";
chatMessages.appendChild(typingIndicator);

// Send message when button is clicked
sendButton.addEventListener("click", sendMessage);

// Send message when Enter is pressed
messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    } else {
        socket.emit("typing"); // Emit typing event
    }
});

// Handle typing indicator
socket.on("typing", () => {
    typingIndicator.style.display = "block";
    setTimeout(() => {
        typingIndicator.style.display = "none";
    }, 1000);
});

// Function to send message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit("chatMessage", message);
        displayMessage(`You: ${message}`, "sent");
        messageInput.value = "";
    }
}

// Receive messages
socket.on("chatMessage", (message) => {
    displayMessage(`User: ${message}`, "received");
});

// Display message in UI
function displayMessage(message, type) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", type);
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
