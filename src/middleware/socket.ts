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
      // falta verificar grupos
      socket.join(room);
      console.log('XATS ACTIUS: ');
      console.log(io.sockets.adapter.rooms);
    });

    socket.on('send message', (message: any, roomID: any) => {
      io.to(roomID).emit('send message', message, roomID);
    });

    socket.on('listXat ready', (nom: any) => {
      // console.log(nom + ' ready');
      socket.leave(socket.id);
      socket.join(nom);
      console.log(io.sockets.adapter.rooms);
      // io.to(nom).emit('listening', true, true);
    });

    socket.on('refresh list', (message: any, nom: any, roomID: any) => {
      // console.log('refresca socio');
      // console.log('nom: ' + nom);
      // console.log(io.sockets.adapter.rooms.get(nom));
      // console.log(socket.adapter.rooms);
      // console.log('--------------');
      // console.log(socket.adapter.sids);
      io.to(nom).emit('update message', message, roomID);
      // io.to(nom).emit('listening', true, true);
    });
    socket.on('leave', (roomID: any) => {
      socket.leave(roomID);
      console.log(io.sockets.adapter.rooms);
    });
    socket.on('listeners', () => {
      socket.removeAllListeners();
    });
    socket.on('disconnect', (reason: string) => {
      console.log(reason);
      socket.leave(socket.id);
    });
  });
};
