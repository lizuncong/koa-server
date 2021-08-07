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
      console.log('普通请求....')
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
app.put('/put', (req, res) => {
   res.json({method: 'put', cookie: req.headers.cookie})
});
app.get('/get', (req, res) => {
   const urlSplitData = req.url.split('?')
   req.path = urlSplitData[0]
   req.query = querystring.parse(urlSplitData[1])
   const time = Math.round(Math.random() * 10) * 100
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