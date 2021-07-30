// const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');

// const app = express();
// app.get('/get', (request, response) => response.json({method: 'get'}));
// app.get('/post', (request, response) => response.json({method: 'post'}));
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

// function eventsHandler(request, response, next) {
//     const headers = {
//       'Content-Type': 'text/event-stream',
//       'Connection': 'keep-alive', // 保持长连接
//       'Cache-Control': 'no-cache',
//     };
//     response.writeHead(200, headers);
  
//     const data = `data: ${JSON.stringify(facts)}\n\n`; // 因为SSE只能传输文本，换行符是必须的，
  
//     response.write(data);
  
//     const clientId = Date.now();
  
//     const newClient = {
//       id: clientId,
//       response
//     };
  
//     clients.push(newClient);
  
//     request.on('close', () => {
//       console.log(`${clientId} Connection closed`);
//       clients = clients.filter(client => client.id !== clientId);
//     });
// }

// function sendEventsToAll(newFact) {
//     clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
// }
  
// async function addFact(request, respsonse, next) {
//     const newFact = request.body;
//     facts.push(newFact);
//     respsonse.json(newFact)
//     return sendEventsToAll(newFact);
// }
  
// app.post('/fact', addFact);

// app.get('/events', eventsHandler);
// app.get('/status', (request, response) => response.json({clients: clients.length}));
// app.get('/get', (request, response) => response.json({clients: clients.length, method: 'get'}));
// app.get('/post', (request, response) => response.json({clients: clients.length, method: 'post'}));
// app.get('/*', (request, response) => response.json({clients: clients.length}));
// let clients = [];
// let facts = [];

const express = require('express');

const app = express();
app.get('/get', (request, response) => response.json({method: 'get'}));
app.get('/post', (request, response) => response.json({method: 'post'}));
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`)
})