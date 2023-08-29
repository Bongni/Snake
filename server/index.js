const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    const name = req.query.name;
    const highScore = 10;

    res.json({ name: name, highScore: highScore });
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})