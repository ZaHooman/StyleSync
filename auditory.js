const chatDisplay = document.getElementById("chatDisplay");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let speechRate = 1;

window.addEventListener("DOMContentLoaded", () => {
    const savedFont = localStorage.getItem("preferredFont");
    if (savedFont) {
        document.body.style.fontFamily = savedFont;
    }

    const theme = localStorage.getItem("preferredTheme");
    if (theme === "dark") setDarkMode();
    else if (theme === "light") setLightMode();

    const size = localStorage.getItem("preferredTextSize");
    if (size) {
        document.body.style.fontSize = size;
        document.getElementById("TextSizeSlider").value = parseInt(size);
    }
});

sendBtn.addEventListener("click", async () => {
    const input = userInput.value.trim();
    if (!input) return;

    appendMessage("You", input);
    userInput.value = "";

    const reply = await getAIResponse(input);
    typeResponse("AI", reply);
});

document.getElementById("speechSpeed").addEventListener("input", (e) => {
    speechRate = parseFloat(e.target.value);
});

document.getElementById('ArialButton').addEventListener('click', () => changeFont('Arial'));
document.getElementById('VerdanaButton').addEventListener('click', () => changeFont('Verdana'));
document.getElementById('OpenDyslexiaButton').addEventListener('click', () => changeFont('OpenDyslexia'));
document.getElementById('TimesNewRomanButton').addEventListener('click', () => changeFont('Times New Roman'));

document.getElementById("colorLight").addEventListener("change", setLightMode);
document.getElementById("colorDark").addEventListener("change", setDarkMode);

document.getElementById("TextSizeSlider").addEventListener("input", (event) => {
    const size = event.target.value + "px";
    document.body.style.fontSize = size;
    localStorage.setItem("preferredTextSize", size);
});

document.getElementById("resetButton").addEventListener("click", () => {
    localStorage.removeItem("preferredFont");
    localStorage.removeItem("preferredTheme");
    localStorage.removeItem("preferredTextSize");

    document.body.style.fontFamily = "";
    document.body.style.fontSize = "20px";
    document.getElementById("TextSizeSlider").value = 20;
    setLightMode();
});


function appendMessage(sender, text) {
    const msg = document.createElement("p");
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatDisplay.appendChild(msg);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function typeResponse(sender, text) {
    let i = 0;
    const p = document.createElement("p");
    p.innerHTML = `<strong>${sender}:</strong> <span id="typingText"></span><span class="typing">|</span>`;
    chatDisplay.appendChild(p);

    const typingSpan = document.getElementById("typingText");

    const interval = setInterval(() => {
        if (i < text.length) {
            typingSpan.textContent += text[i++];
            chatDisplay.scrollTop = chatDisplay.scrollHeight;
        } else {
            clearInterval(interval);
            document.querySelector(".typing").remove();
            speakText(text);
        }
    }, 30);
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    window.speechSynthesis.speak(utterance);
}

async function getAIResponse(prompt) {
    const endpoint = "https://api.openai.com/v1/chat/completions";
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
    };

    const body = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
    };

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error(error);
        return "Sorry, I couldn't connect to the AI.";
    }
}

function changeFont(fontName) {
    const font = fontName + ', sans-serif';
    document.body.style.fontFamily = font;
    localStorage.setItem("preferredFont", font);
}

function setLightMode() {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
    localStorage.setItem("preferredTheme", "light");
}

function setDarkMode() {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    localStorage.setItem("preferredTheme", "dark");
}
