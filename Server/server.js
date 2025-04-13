import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5050;

console.log('🟢 Starting server...');
app.listen(PORT, () => {
  console.log(`🚀 Flashify App running on http://localhost:${PORT}`);
});
