/*
	https://nodejs.org/en/about/
*/
const http = require('http');
const hostname = '127.0.0.1';
const port = 1337;
 
/* 
1.
*/
/*
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/


/*
2.
*/
var server=http.createServer(function(req,res){
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});
server.listen(port, hostname, function(){ //  server.listen.....비동기적. callback함수.
 console.log(`Server running at http://${hostname}:${port}/`);
});