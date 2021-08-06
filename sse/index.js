const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

let clients = [];
let person = [{name: 'lzc', age: 20}];

// 允许跨域
app.use((req, res, next) => {
    if(req.method === 'OPTIONS'){
        // 预检请求
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end();
     } else {
        // 普通请求
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Vary', 'Origin');
        // res.setHeader('Access-Control-Allow-Credentials', 'true');
        next()
     }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// 没有指定消息类型
function sendEventsToAllClients(person) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(person)}\n\n`))
}
 // 指定消息类型，每次有新的连接都通知所有连接的客户端
function sendConnectEventsToAllClients(person) {
    clients.forEach(client => client.response.write(`event: client\ndata: ${JSON.stringify(clients.map(c => c.id))}\n\n`))
} 
app.post('/addPerson', (request, respsonse, next) => {
    const p = request.body;
    person.push(p);
    respsonse.json(p)
    return sendEventsToAllClients(person);
});

app.get('/connect', (request, response, next) => {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);
  
    const clientId = Date.now();
  
    const newClient = {
      id: clientId,
      response
    };
    clients.push(newClient);
   
    sendConnectEventsToAllClients(clients)

    // 连接关闭
    request.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(client => client.id !== clientId);
      sendConnectEventsToAllClients(clients)
    });
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`SSE Events service listening at http://localhost:${PORT}`)
})