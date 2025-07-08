import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import connectDB from './database/database.js';
import todoRoutes from './routes/todoRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const app = express()
const PORT = process.env.PORT

const frontendSrcPath = path.join(__dirname, '../../frontend/src');
app.use(express.static(frontendSrcPath));

app.use(express.json());

app.get('/', (request, response) => {
  response.sendFile(path.join(frontendSrcPath, `index.html`));
})

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);


app.listen(PORT, () => {
  console.log(`Started server on port: ${PORT} \n http://localhost:5000`)
})