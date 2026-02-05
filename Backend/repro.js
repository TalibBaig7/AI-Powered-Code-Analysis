const generateContent = require('./src/services/ai.service');

async function run() {
  try {
    console.log("Calling generateContent...");
    const result = await generateContent("Hello, world!");
    console.log("Result:", result);
  } catch (error) {
    console.error("Error occurred:");
    console.error(error);
  }
}

run();
