/**
 * Vercel serverless function for POST /api/ai/get-review
 * Handles code review requests from the frontend.
 */
const { getReview } = require('../../Backend/src/controllers/ai.controller');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'This endpoint expects a POST request with a JSON body containing "code".',
    });
  }
  return getReview(req, res);
};
