import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

console.log('About to start server...');
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});