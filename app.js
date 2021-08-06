const express = require('express');

const app = express();
app.get('/get', (request, response) => response.json({method: 'get'}));
app.get('/post', (request, response) => response.json({method: 'post'}));
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`)
})