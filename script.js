document.getElementById("quiz").addEventListener("submit", function (e) {
    e.preventDefault();

    let scores = { visual: 0, auditory: 0, kinesthetic: 0 };
    let answers = document.querySelectorAll("#quiz input[type=radio]:checked");

    answers.forEach(answer => {
        scores[answer.value]++;
    });

    let userType = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );

    document.getElementById("result").innerText = `You are a ${userType} learner!`;

    fetch(`https://localhost:5000/${userType}`).catch(console.error);

    setTimeout(() => {
        window.location.href = `${userType}.html`;
    }, 2000);
});

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

function changeBodyColor(color) {
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(`${color}-mode`);
    
    if (color === 'light') {
        document.body.classList.add('light-mode');
        document.body.style.backgroundColor = "#ee8695";
        document.body.style.color = "#292831";
        document.querySelectorAll('button').forEach(button => {
            button.style.backgroundColor = "#4a7a96";
            button.style.color = "white";
        });
        document.querySelectorAll('form').forEach(form => {
            form.style.backgroundColor = "#fbbbad";
            form.style.color = "#292831";
        });
        document.querySelectorAll('.settings').forEach(settings => {
            settings.style.backgroundColor = "#fbbbad";
            settings.style.color = "#292831";
        });
        document.querySelectorAll('h1, h2, h3').forEach(header => {
            header.style.color = "#292831"; 
        });
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.style.backgroundColor = '#fbbbad';
            radio.style.borderColor = '#292831';
        });
        document.querySelectorAll('input[type="range"]').forEach(slider => {
            slider.style.background = '#fbbbad';
            slider.style.color = '#292831';
        });
    } else if (color === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.style.backgroundColor = "#292831";
        document.body.style.color = "#f7f7ff";
        document.querySelectorAll('button').forEach(button => {
            button.style.backgroundColor = "#ee8695";
            button.style.color = "#f7f7ff";
        });
        document.querySelectorAll('form').forEach(form => {
            form.style.backgroundColor = "#333f58";
            form.style.color = "#f7f7ff";
        });
        document.querySelectorAll('.settings').forEach(settings => {
            settings.style.backgroundColor = "#333f58";
            settings.style.color = "#f7f7ff";
        });
        document.querySelectorAll('h1, h2, h3').forEach(header => {
            header.style.color = "#fbbbad";
        });
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.style.backgroundColor = '#333f58';
            radio.style.borderColor = '#fbbbad';
        });
        document.querySelectorAll('input[type="range"]').forEach(slider => {
            slider.style.background = '#333f58';
            slider.style.color = '#fbbbad';
        });
    }
}

document.querySelectorAll('input[name="color"]').forEach(function (radio) {
    radio.addEventListener('click', function () {
        const color = this.value;
        changeBodyColor(color);
    });
});

const elementsToResize = document.querySelectorAll('body, body *');
let defaultSizes = [];

window.addEventListener('DOMContentLoaded', () => {
    elementsToResize.forEach(el => {
        defaultSizes.push({
            element: el,
            size: parseFloat(window.getComputedStyle(el).fontSize)
        });
    });
});

document.getElementById('TextSizeSlider').addEventListener('input', function () {
    const scale = parseFloat(this.value) / 20;
    defaultSizes.forEach(item => {
        item.element.style.fontSize = (item.size * scale) + 'px';
    });
});

document.getElementById('resetButton').addEventListener('click', function () {
    defaultSizes.forEach(item => {
        item.element.style.fontSize = item.size + 'px';
    });
    document.getElementById('TextSizeSlider').value = 20;
    document.body.style.fontFamily = '"Comic Sans MS", sans-serif';
    changeBodyColor('light'); 
    document.body.classList.add('light-mode');
    document.querySelector('input[name="color"][value="light"]').checked = true;
});

document.addEventListener('DOMContentLoaded', () => {
    changeBodyColor('light');
    document.querySelector('input[name="color"][value="light"]').checked = true;
});


document.getElementById("ArialButton").addEventListener("click", () => {
    document.body.style.fontFamily = "Arial";
    localStorage.setItem("preferredFont", "Arial");
});

document.querySelectorAll("input[name='color']").forEach(input => {
    input.addEventListener("change", () => {
        localStorage.setItem("preferredTheme", input.value);
    });
});

document.getElementById("TextSizeSlider").addEventListener("input", (e) => {
    const size = e.target.value + "px";
    document.body.style.fontSize = size;
    localStorage.setItem("preferredTextSize", size);
});



