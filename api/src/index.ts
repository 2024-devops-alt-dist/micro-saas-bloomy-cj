import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.API_PORT;

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/', (_req, res) => res.send('Hello from API'));

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${port}`);
});


