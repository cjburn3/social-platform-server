import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Social Platform!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});