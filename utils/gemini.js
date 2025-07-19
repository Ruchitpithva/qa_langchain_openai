const genAI = require("../config/gemini")

module.exports.processPDFAndAnswerGemini = async (pdfPath, question, vectorStoreModule) => {
    const vectorStore = await vectorStoreModule.load(pdfPath, new (require('@langchain/openai').OpenAIEmbeddings)());
    const results = await vectorStore.similaritySearch(question, 1);
    const context = results.map(r => r.pageContent).join('\n');
  
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
    const result = await model.generateContent([
      `You are an intelligent assistant that provides accurate and concise answers 
       based strictly on the provided context extracted from a PDF. 
       Do not hallucinate or assume.`,
      `Question: ${question}`,
      `Context: ${context}`
    ]);
  
    const response = await result.response;
    const answer = response.text();
  
    return {
      answer,
      sources: results.map(r => r.metadata?.source || 'N/A')
    };
  };