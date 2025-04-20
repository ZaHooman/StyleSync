window.addEventListener("DOMContentLoaded", () => {
    const savedFont = localStorage.getItem("preferredFont");
    if (savedFont) {
        document.body.style.fontFamily = savedFont;
    }

    const theme = localStorage.getItem("preferredTheme");
    if (theme === "dark") {
        setDarkMode();
    } else if (theme === "light") {
        setLightMode();
    }
    
    const size = localStorage.getItem("preferredTextSize");
    if (size) {
        document.body.style.fontSize = size;
    }
    document.getElementById("TextSizeSlider").value = size || 20;
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
            headers: {
                "Content-Type": "application/json"
            },
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
            headers: {
                "Content-Type": "application/json"
            },
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
function changeFont(fontName) {
    document.body.style.fontFamily = fontName + ', sans-serif';
    document.querySelector('.title').style.fontFamily = fontName + ', sans-serif';
    const subtitles = document.querySelectorAll('.subtitle');
    subtitles.forEach(subtitle => {
        subtitle.style.fontFamily = fontName + ', sans-serif';
    });
}

document.getElementById('ArialButton').addEventListener('click', function () {
    changeFont('Arial');
});

document.getElementById('VerdanaButton').addEventListener('click', function () {
    changeFont('Verdana');
});

document.getElementById('OpenDyslexiaButton').addEventListener('click', function () {
    changeFont('OpenDyslexia');
});

document.getElementById('TimesNewRomanButton').addEventListener('click', function () {
    changeFont('Times New Roman');
});

document.getElementById("colorLight").addEventListener("change", () => {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
    localStorage.setItem("preferredTheme", "light");
});

document.getElementById("colorDark").addEventListener("change", () => {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    localStorage.setItem("preferredTheme", "dark");
});

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


