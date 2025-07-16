const path = require("path");
const fs = require("fs");
const { processPDFAndAnswer } = require('../utils/openai');
const { OpenAIEmbeddings } = require('@langchain/openai');
const { PDFLoader } = require('@langchain/community/document_loaders/fs/pdf');
const { HNSWLib } = require('@langchain/community/vectorstores/hnswlib');
const { CharacterTextSplitter } = require('langchain/text_splitter');

const uploadsDir = path.join(__dirname, '../uploads/.tmp');
const vectorDir = path.join(__dirname, '../vector_db');

module.exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const sessionId = req.sessionId;

    const loader = new PDFLoader(file.path);
    const docs = await loader.loadAndSplit(
      new CharacterTextSplitter({ separator: '. ', chunkSize: 300, chunkOverlap: 30 })
    );

    const storePath = path.join(vectorDir, sessionId);
    const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
    await vectorStore.save(storePath);

    return res.status(200).send({ status: true, data: sessionId, message: "PDF uploaded successfully." });
  } catch (error) {
    return res.status(500).send({ status: false, message: error?.message });
  }
}

module.exports.handleAskPDFQuestion = async (req, res) => {
  try {
    const { session_id, question } = req?.body;

    const vectorPath = path.join(vectorDir, session_id);

    if (!fs.existsSync(vectorPath)) {
      return res.status(200).send({ status: false, message: "Invalid session or expired session." });
    }

    const { answer, sources } = await processPDFAndAnswer(vectorPath, question);

    if (answer) {
      return res.status(200).send({
        status: true,
        data: {
          answer,
          sources
        },
        message: "Answer found successfully."
      });
    } else {
      return res.status(200).send({
        status: false,
        message: "Answer not found."
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message || "Internal Server Error"
    });
  }
};

module.exports.endChat = async (req, res) => {
  const { session_id } = req.body;

  const pdfPath = path.join(uploadsDir, `${session_id}.pdf`);
  const vectorPath = path.join(vectorDir, session_id);

  try {
    if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
    if (fs.existsSync(vectorPath)) fs.rmSync(vectorPath, { recursive: true });

    return res.status(200).send({ status: true, message: "Session ended and cleaned up." });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};