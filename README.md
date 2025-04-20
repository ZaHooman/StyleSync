# 🎨 StyleSync

**StyleSync** is a personalized learning assistant that adapts to your preferred learning style—visual, auditory, or kinesthetic. Built during a hackathon, it combines a quick onboarding quiz with AI-powered content delivery to enhance user engagement and learning efficiency.

---

## 🚀 Features

- **Learning Style Quiz** – Determines the user's preferred learning method.
- **Customized AI Interfaces** – Directs users to a tailored AI experience based on quiz results.
- **OpenAI Integration** – Uses OpenAI's API to generate responses suited to each learning style.
- **User Preferences** – Allows customization of font, theme (light/dark), and text size, with preferences saved locally.
- **Error Handling** – Includes fallback messages to maintain user experience in case of API failures.

---

## 🧠 How It Works

1. **Start** – Users take a short quiz to identify their learning style.
2. **Redirect** – Based on the result, users are directed to one of three HTML pages:
   - `visual.html`
   - `auditory.html`
   - `kinesthetic.html`
3. **Interact** – Each page features a chatbot tailored to the selected learning style.
4. **Customize** – Users can adjust font, theme, and text size to suit their needs.

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js
- **AI Integration**: OpenAI API

---

## 📁 Project Structure

```
StyleSync/
├── assets/               # Images and design assets
├── fonts/                # Custom fonts
├── auditory.html         # Auditory learning interface
├── auditory.js           # JS for auditory interface
├── kinesthetic.html      # Kinesthetic learning interface
├── visual.html           # Visual learning interface
├── visual.js             # JS for visual interface
├── index.html            # Landing page with quiz
├── script.js             # Main JS script
├── style.css             # Main CSS file
├── fonts.scss            # SCSS for fonts
├── server.js             # Node.js backend server
├── package-lock.json     # NPM lock file
├── README.md             # Project documentation
└── StyleSync - Design Files.zip # Design assets
```

---

## 🧪 Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ZaHooman/StyleSync.git
   cd StyleSync
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the root directory.
   - Add your OpenAI API key:

     ```
     OPENAI_API_KEY=your-openai-api-key
     ```

4. **Start the server**:

   ```bash
   node server.js
   ```

5. **Open the app**:

   - Launch `index.html` in your browser to get started.

---

## 🔐 Ethical Considerations

- **Transparency** – Users know they’re interacting with an AI system.
- **Privacy** – No personal data is collected or stored.
- **Security** – API keys are kept private via environment variables.
- **Accessibility** – The interface supports customizable fonts, sizes, and themes.

This project is licensed under the MIT License.
```

---

Paste this into your `README.md` file, commit it, and you're good to go! Want me to generate a Figma-style “Design Section” or add badges (like MIT License or Built with Node.js)?
