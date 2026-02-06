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
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Test");
        await result.response;
        console.log("✅ SUCCESS: Your API key is valid!");
    } catch (error) {
        console.log("❌ FAILURE: Your API key is invalid.");
        console.log("Error Details:", error.message);
        console.log("-----------------------------------------");
        console.log("💡 What to do:");
        console.log("1. Go to https://aistudio.google.com/ and get a NEW key.");
        console.log("2. Paste it into your Backend/.env file.");
        console.log("3. Update it in your Vercel Dashboard Environment Variables.");
    }
}

verify();
