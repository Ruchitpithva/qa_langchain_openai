# 🧠 PDF QA Chatbot (Backend)

This is the backend for a **PDF Question-Answer Chatbot** that allows users to upload a PDF, select an AI model (OpenAI ChatGPT or Gemini), and ask questions based on the content of the uploaded PDF.

Each user session is isolated — allowing one PDF per session, with questions and context handled temporarily in memory or file-based vector storage.

---

## 🚀 Features

- 📁 Upload PDF per session using `multer`
- 🧠 Ask questions based on PDF content using **LangChain** with:
  - ✅ OpenAI (ChatGPT)
  - ✅ Gemini (Google AI)
- 🔐 Supports ChatGPT secret access protection
- 🧹 Clean up vector store and uploaded files on session end
- 📄 Uses `HNSWLib` for vector similarity search

---

## 🧑‍💻 Tech Stack

- **Node.js**
- **Express.js**
- **Multer** (for PDF file uploads)
- **LangChain**
- **OpenAI SDK**
- **Gemini SDK (Google Generative AI)**
- **HNSWLib (for vector search)**
- **dotenv** for config management

---

## 🧠 How It Works

- PDF is uploaded and split into chunks.
- Chunks are converted into embeddings (via OpenAI or Gemini).
- On each question:
  - The most relevant chunks are retrieved via vector search.
  - A prompt is constructed and passed to the selected LLM.
- Session ends by clearing temporary files and memory.

---

## 🔐 ChatGPT Access Protection

To prevent misuse, access to OpenAI (ChatGPT) is protected with a secret code. This must match SECRET_ACCESS_CODE from .env.

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Ruchitpithva/qa_langchain_openai.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

- Create a .env file in the root with

```bash
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
SECRET_ACCESS_CODE=your_secret_code_for_chatgpt
```

### 4. Run the App

```bash
nodemon
```
