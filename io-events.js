// socket.io events
module.exports = (io, onerror) => {

  // on connect say hi!
  io.on('connection', socket => {

    console.log('INFO:\tA user has connected.');

  });
};
