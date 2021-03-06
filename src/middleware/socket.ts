/* eslint-disable prefer-template */
/* eslint-disable no-shadow */
/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable no-console */
// eslint-disable-next-line no-shadow
module.exports = (
  app: any,
  io: {
    sockets: { adapter: { rooms: any } };
    on: (arg0: string, arg1: (socket: any) => void) => void;
    emit: (arg0: string, arg1: any) => void;
    to: (arg0: any) => { (): any; new (): any; emit: { (arg0: string, arg1: any, arg2: any): void; new (): any } };
  }
) => {
  io.on('connection', (socket) => {
    socket.on('xat actiu', (room: any) => {
      socket.join(room);
    });
    socket.on('send message', (message: any, roomID: any) => {
      io.to(roomID).emit('send message', message, roomID);
    });
    socket.on('listXat ready', (nom: any) => {
      socket.leave(socket.id);
      socket.join(nom);
    });
    socket.on('refresh list', (message: any, nom: any, roomID: any) => {
      io.to(nom).emit('update message', message, roomID);
    });
    socket.on('leave', (roomID: any) => {
      socket.leave(roomID);
    });
    socket.on('listeners', () => {
      socket.removeAllListeners();
    });
    socket.on('disconnect', (reason: string) => {
      socket.leave(socket.id);
    });
  });
};
