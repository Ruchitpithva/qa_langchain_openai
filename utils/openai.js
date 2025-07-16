const { OpenAIEmbeddings } = require('@langchain/openai');
const { HNSWLib } = require('@langchain/community/vectorstores/hnswlib');
const openAI = require('../config/openai');

module.exports.processPDFAndAnswer = async (pdfPath, question) => {
  const vectorStore = await HNSWLib.load(pdfPath, new OpenAIEmbeddings());
  const results = await vectorStore.similaritySearch(question, 1);
  const context = results.map(r => r.pageContent).join('\n');

  // Ask OpenAI
  const response = await openAI.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 1,
    messages: [
      {
        role: 'system',
        content: `You are an intelligent assistant that provides accurate and concise answers 
                  based strictly on the provided context extracted from a PDF resume. 
                  If the answer is not clearly available in the context, respond with 
                  "I'm not sure based on the provided context." Do not make assumptions or hallucinate facts.`,
      },
      {
        role: 'user',
        content: `Here is the user's question along with the relevant context extracted from their resume.
                  Please answer based only on the given context.
                  Question: ${question}
                  Context: ${context}`,
      }
    ],

  });

  const answer = response?.choices?.[0]?.message?.content;
  return {
    answer,
    sources: results.map(r => r.metadata?.source || 'N/A')
  };
};