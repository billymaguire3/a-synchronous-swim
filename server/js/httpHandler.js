const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const message = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;

module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // can do things with req.method and req.url here
  // add functionality to get route a random swimmer

  // if request method is OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next(); // invoke next() at the end of a request to help with testing!
  }
  // else if Request method is GET
  else if (req.method === 'GET') {
    if (req.url === "/moves") {
      console.log("Request Handler:  ", req.url);
      const moves = ['up','down','left','right']
      const currentMove = messageQueue.dequeue();

      console.log("current Move-: ",currentMove);
      // responds with 200 status code
      res.writeHead(200, headers);
      // send random move to user using method on response object
      if (currentMove === undefined || !moves.includes(currentMove)) {
        res.end();
      } else {

        res.write(currentMove);
        // end it
        res.end();
        // call next
        next();
    }
  }
};


// if (req.url === "/moves") {
//   console.log("Request Handler:  ", req.url);
//   // create array of moves
//   const moves = ['up','down', 'left', 'right'];
//   // create variable set to Math.Random() for random index
//   const randomIndex = Math.floor(Math.random() * moves.length);
//   console.log('randomIndex', randomIndex);
//   // use index to grab random move
//   const randomMove = moves[randomIndex];
//   // responds with 200 status code
//   res.writeHead(200, headers);
//   // send random move to user using method on response object
//   res.write(randomMove);
//   // end it
//   res.end();
//   // call next
//   next();
}
