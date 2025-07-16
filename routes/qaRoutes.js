const express = require('express');
const multer = require('../middleware/multer');
const askQuestionController = require('../controller/askQuestion');

const router = express.Router();

router.post("/upload-file", multer.uploadImg.single("file"), askQuestionController.uploadFile);
router.post('/ask', askQuestionController.handleAskPDFQuestion);
router.post('/end-chat', askQuestionController.endChat);

module.exports = router;