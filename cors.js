// const http = require('http')
// const querystring = require('querystring')


// // 只解析content-type为application/json类型的数据
// const bodyParser = (req) => {
//   return new Promise((resolve) => {
//     if(req.method !== 'POST'){
//       return resolve({})
//     }
//     if(req.headers['content-type'] !== 'application/json'){
//       return resolve({})
//     }
//     let postData = ''
//     req.on('data', chunk => {
//       postData += chunk.toString()
//     })

//     req.on('end', () => {
//       resolve(JSON.parse(postData))
//     })
//   })
// }


// const server = http.createServer(async (req, res) => {

//   res.setHeader('Content-type', 'application/json')

//   const urlSplitData = req.url.split('?')
//   req.path = urlSplitData[0]
//   req.query = querystring.parse(urlSplitData[1])



//   req.body = await bodyParser(req)

//   if(req.method === 'GET' && req.path === '/get'){
//     console.log('get请求...', req.query)
//     const { productName, keyword } = req.query
//     res.end(JSON.stringify({ method: 'GET', productName, keyword }))
//     return
//   }

//   if(req.method === 'POST' && req.path === '/post'){
//     console.log('post请求...', req.body)
//     return res.end(JSON.stringify({ method: 'POST'}))
//   }

//   res.end('404 Not Found!')

// })


// server.listen(3000)


const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.get('/get', (request, response) => {
    // response.setHeader('Access-Control-Allow-Credentials', true);
    // response.setHeader('Access-Control-Allow-Origin', '*');
    response.json({method: 'get'})
});
app.get('/post', (request, response) => response.json({method: 'post'}));
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`)
})