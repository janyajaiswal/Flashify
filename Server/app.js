import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import upload from './uploadMiddleware.js';
import { uploadAndConvert } from './flashcardController.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log('📦 Registering /api/flashcards routes...');

app.get('/api/flashcards/ping', (req, res) => {
  console.log('🎯 Ping route hit!');
  res.send('pong from Flashify!');
});

app.post('/api/flashcards/upload', upload.single('file'), uploadAndConvert);

console.log('✅ /upload route should now be active');

export default app;
