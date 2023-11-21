import { load, save } from './src/storage.js';
import express from 'express';

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    const player = load(req.query.name);

    res.json({ name: player.getName(), highScore: player.getHighScore() });
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})