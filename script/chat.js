// Floating chat elements
document.addEventListener("DOMContentLoaded", () => {
    const chatToggle = document.getElementById("chat-toggle");
    const chatContainer = document.getElementById("chat-container");
    const closeChat = document.getElementById("close-chat");

    const showEmbeddedChat = document.getElementById("show-embedded-chat");
    const embeddedChat = document.getElementById("embedded-chat");

    if (chatToggle) {
        chatToggle.addEventListener("click", () => {
            chatContainer.style.display = chatContainer.style.display === "none" ? "block" : "none";
        });
    }

    if (closeChat) {
        closeChat.addEventListener("click", () => {
            chatContainer.style.display = "none";
        });
    }

    if (showEmbeddedChat) {
        showEmbeddedChat.addEventListener("click", () => {
            embeddedChat.style.display = embeddedChat.style.display === "none" ? "block" : "none";
        });
    }

    // Navbar scroll effect
    window.addEventListener("scroll", function() {
        const navbar = document.getElementById("navbar");
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    });
});

// Chat functionality
async function sendMessage() {
    const input = document.getElementById("userMessage");
    const message = input.value.trim();
    if (message === "") return;

    addMessage(message, "user-message");

    const typingIndicator = addTypingIndicator();

    try {
        const response = await fetch("https://n8n.innovai.com.co/webhook/mensajes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        removeTypingIndicator(typingIndicator);

        if (data.output) {
            const messages = data.output.split("\n\n");
            messages.forEach(msg => addMessage(msg, "bot-message"));
        } else {
            addMessage("No response received.", "bot-message");
        }
    } catch (error) {
        console.error("Error:", error);
        removeTypingIndicator(typingIndicator);
        addMessage("Error sending message.", "bot-message");
    }

    input.value = "";
}

function addMessage(text, className) {
    const chatBox = document.getElementById("chatBox");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", className);
    messageElement.textContent = text;

    if (className === "user-message") {
        messageElement.style.alignSelf = "flex-end";
    } else {
        messageElement.style.alignSelf = "flex-start";
    }

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addTypingIndicator() {
    const chatBox = document.getElementById("chatBox");
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing-indicator");
    typingIndicator.textContent = "Escribiendo";
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    let dots = 0;
    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        typingIndicator.textContent = "Escribiendo" + ".".repeat(dots);
    }, 500);

    typingIndicator.interval = interval;
    return typingIndicator;
}

function removeTypingIndicator(typingIndicator) {
    clearInterval(typingIndicator.interval);
    typingIndicator.remove();
}
