import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = process.env.PORT

const frontendSrcPath = path.join(__dirname, '../../frontend/src');
app.use(express.static(frontendSrcPath));



app.use(express.json());

app.get('/', (request, response) => {
  response.sendFile(path.join(frontendSrcPath, `index.html`));
})

app.post('/api/register', (request, response) => {
  const {username, password} = request.body;
  console.log(username, password);
  response.json({"status":"ok"});
})

app.listen(PORT, () => {
  console.log(`Started server on port: ${PORT}`)
})