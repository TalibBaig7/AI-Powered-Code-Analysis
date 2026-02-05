const express = require('express');
const aiRoutes = require('./routes/ai.routes.js');

const app = express();
const cors = require('cors');

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/ai', aiRoutes);

module.exports = app;