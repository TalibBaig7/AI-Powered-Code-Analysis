const express = require('express');
const { getReview } = require('../controllers/ai.controller');

const router = express.Router();

router.get('/get-review', (req, res) => {
    res.status(405).json({
        error: "Method Not Allowed",
        message: "This endpoint expects a POST request with a JSON body containing 'code'."
    });
});

router.post('/get-review', getReview);

module.exports = router;