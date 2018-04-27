// ROUTING
// routing deps
const express = require('express');
const app = express();
const http = require('http').Server(app);

// static routing
app.use(express.static('public'));

// redirect everything to homepage
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

// listen on port 80
http.listen(80, (t1, t2) => console.log('INFO:\tRunning on port 80.'));


// RECIPES (FILE I/O)
// file io (for recipes json)
const fs = require('fs');

// convenience function to print errors
const onerror = err => err && console.error(`ERROR:\t${err}.`);

// cookbook definitions
const cookbook = require('./cookbook.js')('./data/cookbook.json', onerror);
console.log(cookbook.get());

// WEBSOCKET
// socket.io
const io = require('socket.io')(http);

// socket.io events are located in external file
require('./io-events.js')(io, onerror);
