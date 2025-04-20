
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });
    
    const imageUrl = response.data[0].url;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Image generation error:", error);
    res.status(500).json({ error: "Failed to generate image." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});

window.addEventListener("DOMContentLoaded", () => {
    const savedFont = localStorage.getItem("preferredFont");
    if (savedFont) document.body.style.fontFamily = savedFont;

    const theme = localStorage.getItem("preferredTheme");
    document.body.classList.add(theme === "dark" ? "dark-mode" : "light-mode");

    const size = localStorage.getItem("preferredTextSize");
    if (size) document.body.style.fontSize = size;
});

const chatDisplay = document.getElementById("chatDisplay");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", async () => {
    const input = userInput.value.trim();
    if (!input) return;

    appendMessage("You", input);
    userInput.value = "";

    if (isImagePrompt(input)) {
        appendMessage("AI", "Generating your image...");
        await generateImage(input);
    } else {
        const reply = await getAIResponse(input);
        typeResponse("AI", reply);
    }
});

function appendMessage(sender, text) {
    chatDisplay.innerHTML += `<p><strong>${sender}:</strong> ${text}</p>`;
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function typeResponse(sender, text) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            const typed = text.slice(0, i + 1);
            chatDisplay.innerHTML = chatDisplay.innerHTML.replace(/AI:.*$/, `<p><strong>${sender}:</strong> ${typed}<span class="typing"></span></p>`);
            chatDisplay.scrollTop = chatDisplay.scrollHeight;
            i++;
        } else {
            clearInterval(interval);
            chatDisplay.innerHTML = chatDisplay.innerHTML.replace('<span class="typing"></span>', '');
        }
    }, 30);
}

function isImagePrompt(text) {
    return /(generate|create|draw|make).*(image|picture|drawing|photo)/i.test(text);
}

async function getAIResponse(message) {
    try {
        const response = await fetch("http://localhost:5000/generate-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: message })
        });
        const data = await response.json();
        return data.imageUrl ? `<img src="${data.imageUrl}" alt="Generated image">` : "I didn't understand that, could you try again?";
    } catch (error) {
        console.error(error);
        return "Sorry, something went wrong. Please try again.";
    }
}

async function generateImage(prompt) {
    try {
        const response = await fetch("http://localhost:5000/generate-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        const img = document.createElement("img");
        img.src = data.imageUrl;
        img.alt = prompt;
        img.style.maxWidth = "100%";
        img.style.borderRadius = "12px";
        img.style.marginTop = "10px";

        chatDisplay.appendChild(img);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    } catch (error) {
        appendMessage("AI", "Sorry, something went wrong while generating the image.");
    }
}
