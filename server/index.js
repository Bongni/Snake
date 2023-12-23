import { load, save } from './src/storage.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:3000",
};

const app = express();
app.use(cors(corsOptions));

app.get("/get", (req, res) => {
    const name = decodeURIComponent(req.query.name);
    const player = load(name);

    res.json({ name: name, highScore: player.getHighScore() });
})

const jsonParser = bodyParser.json();
app.post("/post", jsonParser, (req, res) => {
    save(req.body.name, req.body.highScore);
    
    res.send();
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})