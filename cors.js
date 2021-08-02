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
// app.use((req, res, next) => {
//    if(req.method === 'OPTIONS'){
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'X-PINGOTHER');
//     // res.setHeader('Access-Control-Allow-Methods', 'GET');
//     res.end();
//    } else {
//       // 普通请求
//       res.setHeader('Access-Control-Allow-Origin', '*');
//       next()
//    }
// });
const express = require('express');

const app = express();
app.use((req, res, next) => {
   if(req.method === 'OPTIONS'){
      // 预检请求
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'X-PINGOTHER');
      res.end();
   } else {
      // 普通请求
      res.setHeader('Access-Control-Allow-Origin', '*');
      next()
   }
});
app.get('/get', (request, response) => {
    response.setHeader('X-My-Custom-Header', 'test custom header');
    response.setHeader('Access-Control-Expose-Headers', 'X-My-Custom-Header');
    response.json({method: 'get'})
});
app.listen(3000, () => {
  console.log(`service listening at http://localhost:3000`)
})