import express from 'express';

const app = express();
const PORT = 5050;

app.get('/', (req, res) => {
  console.log('✅ / route hit');
  res.send('Hello from test server');
});

app.listen(PORT, () => {
  console.log(`🚨 TEST SERVER RUNNING at http://localhost:${PORT}`);
});
