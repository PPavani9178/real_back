const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('views'));

app.get('/logs', (req, res) => {
  const level = req.query.level ? req.query.level.toUpperCase() : 'INFO';
  const logFile = fs.readFileSync('logfile.log', 'utf-8');
  const logs = logFile.split('\n').filter(line => line.includes(level));

  if (req.query.fetch === 'true') {
    return res.json({ logs });
  }

  res.sendFile(path.join(__dirname, 'views', 'logs.html'));
});

app.listen(3000, () => {
  console.log('Log dashboard running on http://localhost:3000/logs');
});
