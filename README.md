# 🎨 StyleSync

**StyleSync** is a personalized learning assistant that adapts to your preferred learning style—visual, auditory, or kinesthetic. Built during a hackathon, it combines a quick onboarding quiz with AI-powered content delivery to enhance user engagement and learning efficiency.

---

## 🚀 Features

- **Learning Style Quiz** Determines the user's preferred learning metho.
- **Customized AI Interfaces** Directs users to a tailored AI experience based on their quiz result.
- **OpenAI Integration** Utilizes OpenAI's API to generate responses suited to each learning styl.
- **User Preferences** Allows customization of font, theme (light/dark), and text size, with preferences saved locall.
- **Error Handling** Includes fallback messages to maintain user experience in case of API failure.

---

## 🧠 How It Works

1. **Start*: Users begin with a short quiz to identify their learning stye.
2. **Redirect*: Based on the result, users are directed to one of three HTML pags:
   - `visual.html`
   - `auditory.html`
   - `kinesthetic.html`
3. **Interact*: Each page features an AI chatbot interface tailored to the specific learning stye.
4. **Customize*: Users can adjust font, theme, and text size to their preferene.

---

## 🛠️ Tech Stack

- **Frontend*: HTML, CSS, JavaScipt
- **Backend*: Nod.js
- **AI Integration*: OpenAIAPI
- **Design Assets*: Custom logo and basic design elemnts

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

     ```env
     OPENAI_API_KEY=your-openai-api-key
     ```

4. **Start the server**:

   ```bash
   node server.js
   ```

5. **Access the application**:

   - Open `index.html` in your browser to start the quiz and experience StyleSync.

---

## 🔐 Ethical Considerations

- **Transparecy**: Users are informed they are interacting with an AI ystem.
- **Privcy**: No personal data is collected or tored.
- **Securty**: API keys are managed securely using environment variables and are not exposed in the coebase.
- **Accessibilty**: Users can customize font, theme, and text size to suit theirneeds.
