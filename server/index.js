var storedMessage = require('./js/messageQueue')


const keypressHandler = require('./js/keypressHandler');
// message represents queue in initialize
// enqueue message anytime command is typed in console
keypressHandler.initialize(message => {
  console.log(`Message received: ${message}`)
  storedMessage.enqueue(message);
});

const httpHandler = require('./js/httpHandler');

httpHandler.initialize(storedMessage);

const http = require('http');
const server = http.createServer(httpHandler.router);

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);
