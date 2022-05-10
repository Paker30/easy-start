import express from 'express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { version } = require('../package.json');
const app = express();
import { helloWorld } from './api/helloWorld.js';
app.use(express.json());
const port = 8000;

app.get('/version', (req, res) => res.send(version));
app.get('/hello-world', helloWorld);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
