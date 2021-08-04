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
const express = require('express')
const querystring = require('querystring')
const app = express();
app.use((req, res, next) => {
   if(req.method === 'OPTIONS'){
      // 预检请求
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end();
   } else {
      // 普通请求
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9001');
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next()
   }
});
app.get('/login', (req, res) => {
   res.setHeader('Set-Cookie', ['type=ninja;Secure;SameSite=None;', 'language=javascript;Secure', 'name=lzc;SameSite=Strict']);
   res.json({method: 'get', cookie: req.headers.cookie})
});
app.get('/get', (req, res) => {
   const urlSplitData = req.url.split('?')
   req.path = urlSplitData[0]
   req.query = querystring.parse(urlSplitData[1])
   const time = (req.query.id * 1000) + Math.round(Math.random() * 10) * 100
   console.log('get..', req.query.id)
   res.setHeader('Connection', 'Keep-Alive');
   res.setHeader('timeout', '60');
   setTimeout(() => {
      res.json({method: 'get', id: req.query.id, time: `${time}ms` })
   }, time)
});
app.listen(3000, () => {
  console.log(`service listening at http://localhost:3000`)
})