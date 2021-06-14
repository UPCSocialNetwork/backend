/* eslint-disable prefer-template */
/* eslint-disable no-shadow */
/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable no-console */
// eslint-disable-next-line no-shadow
module.exports = (
  app: any,
  io: {
    on: (arg0: string, arg1: (socket: any) => void) => void;
    emit: (arg0: string, arg1: any) => void;
    to: (arg0: any) => { (): any; new (): any; emit: { (arg0: string, arg1: any): void; new (): any } };
  }
) => {
  io.on('connection', (socket) => {
    socket.on('xat actiu', (room: any) => {
      // console.log(`${emisor} connected at room ${room} with this participantID: ${participant}`);
      socket.join(room);
    });

    socket.on('send message', (message: any, roomID: any) => {
      // console.log('socket rooms2: ' + socket.rooms.has(roomID));
      io.to(roomID).emit('send message', message);
    });
  });
};
