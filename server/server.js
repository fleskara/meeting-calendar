const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(port);

server.once('listening', function () {
    console.log(`The server is running at http://localhost:${port}`);
});
  