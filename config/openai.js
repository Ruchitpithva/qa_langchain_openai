const dotenv = require("dotenv");
const OpenAI = require('openai');

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    temprature: 1
});

module.exports = openai;