const app = require('../src/app');

module.exports = (req, res) => {
    /**
     * When deployed on Vercel, requests come in as `/api/...`.
     * Our Express app in `src/app.js` is mounted at root and defines routes like `/ai/get-review`.
     * We strip the leading `/api` so that `/api/ai/get-review` becomes `/ai/get-review`
     * and matches the Express routes correctly.
     */
    if (req.url.startsWith('/api')) {
        req.url = req.url.replace(/^\/api/, '') || '/';
    }
    app(req, res);
};
