import express from 'express';
import upload from './uploadMiddleware.js';
import { uploadAndConvert } from './flashcardController.js';
console.log('🧪 flashcardRoutes.js is being loaded');
const router = express.Router();

router.get('/ping', (req, res) => {
  console.log('🎯 /api/flashcards/ping route works');
  res.send('pong');
});

router.get('/', (req, res) => {
  res.send('📦 Hello from /api/flashcards root!');
});

router.post('/upload', upload.single('file'), uploadAndConvert);

export default router;
