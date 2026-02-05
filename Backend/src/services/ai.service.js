require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

async function generateContent(prompt) {
  const modelName = "gemini-2.5-flash";
  console.log("------------------------------------------------");
  console.log("🔑 ACTIVE API KEY:", process.env.GOOGLE_GEMINI_KEY ? process.env.GOOGLE_GEMINI_KEY.slice(0, 10) + "..." : "UNDEFINED");
  console.log("🤖 MODEL:", modelName);
  console.log("------------------------------------------------");

  try {
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: `You are an expert code reviewer. Provide a detailed, professional review of the code. 
      Structure your response with the following Markdown headers:
      ## 🔍 Code Analysis
      Brief summary of what the code does.
      
      ## 🐛 Issues & Vulnerabilities
      List any bugs, logic errors, or security concerns.
      
      ## 🛠 Suggested Improvements
      Refactoring tips, performance optimizations, and best practices.
      
      ## 💡 Verdict
      Final thoughts on the code quality.`
    });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("❌ Error in generateContent:", error);
    if (error.message.includes("429")) {
      console.error("⚠️ Quota exceeded (429). Please check your plan.");
    }
    throw error;
  }
}

module.exports = generateContent;