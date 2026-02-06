require('dotenv').config({ path: './Backend/.env' });
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function verify() {
    const key = process.env.GOOGLE_GEMINI_KEY;
    console.log("-----------------------------------------");
    console.log("🔍 Testing API Key:", key ? key.slice(0, 10) + "..." : "MISSING");

    if (!key) {
        console.log("❌ FAILURE: No GOOGLE_GEMINI_KEY found in Backend/.env");
        return;
    }

    const genAI = new GoogleGenerativeAI(key);
    const candidateModels = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-2.0-flash-exp", "gemini-2.5-flash-lite", "gemini-pro-latest"];

    for (const modelName of candidateModels) {
        console.log(`\n⏳ Testing model: ${modelName}...`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Test");
            await result.response;
            console.log(`✅ SUCCESS: Model '${modelName}' is working!`);
            return;
        } catch (error) {
            console.log(`❌ FAILED for '${modelName}': ${error.message.includes('404') ? 'Model not found' : error.message}`);
        }
    }

    console.log("\n❌ ALL candidate models failed.");
    console.log("Please check which models are enabled for your API key in Google AI Studio.");
    console.log("-----------------------------------------");
    console.log("💡 What to do:");
    console.log("1. Go to https://aistudio.google.com/ and get a NEW key.");
    console.log("2. Paste it into your Backend/.env file.");
    console.log("3. Update it in your Vercel Dashboard Environment Variables.");
}

verify();
