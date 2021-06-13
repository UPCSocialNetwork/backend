/* eslint-disable no-shadow */
/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable no-console */
// eslint-disable-next-line no-shadow
module.exports = (
  app: any,
  io: {
    on: (arg0: string, arg1: (socket: { on: (arg0: string, arg1: (emisor: any) => void) => void }) => void) => void;
  }
) => {
  io.on('connection', (socket: { on: (arg0: string, arg1: (emisor: any, room: any) => void) => void }) => {
    socket.on('connected', (emisor: any, room: any) => {
      console.log(`${emisor} connected at ${room}`);
    });

    /* socket.on('chat message', (message) => {
        console.log(message);
        io.emit('chat message', message);
      });*/
  });
};
