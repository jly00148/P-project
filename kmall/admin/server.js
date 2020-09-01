const http = require('http');
const port = 3000;
const server = http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.end(JSON.stringify(["learn js",'lean react']))
})

server.listen(port,'127.0.0.1',()=>{
    console.log('the server is running at https://127.0.0.1:3000');
})
