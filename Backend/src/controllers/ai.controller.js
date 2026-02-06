const aiService = require('../services/ai.service');

const getReview = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Request headers:", req.headers);

    if (!req.body || !req.body.code) {
      return res.status(400).json({
        error: "Invalid Request",
        message: "Please ensure you are sending a POST request with 'Content-Type: application/json' and a JSON body containing 'code'."
      });
    }

    const code = req.body.code;
    const response = await aiService(code);
    console.log("✅ Response received from AI service:", response ? response.slice(0, 50) + "..." : "EMPTY");
    console.log("📤 Sending response to client...");
    res.json({ response });
    console.log("✅ Response sent.");
  } catch (error) {
    console.error("Error in getReview:", error);
    res.status(500).json({
      error: "Failed to generate review",
      message: error.message,
      code: error.status || 500
    });
  }
};

module.exports = { getReview };