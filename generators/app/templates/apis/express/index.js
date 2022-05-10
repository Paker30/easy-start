import express from 'express';

const app = express();
import { helloWorld } from './api/helloWorld.js';
import { apiVersion } from './api/version.js';
app.use(express.json());
const PORT = 8000;

app.get('/health-check', apiVersion);
app.get('/hello-world', helloWorld);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});
