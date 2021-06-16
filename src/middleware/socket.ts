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
      // console.log('Usuari: ' + nom);
      socket.join(nom);
      // io.to(nom).emit('refresh list', )
    });

    socket.on('refresh list', (message: any, nom: any, roomID: any) => {
      // console.log('refresca socio');
      // console.log('nom: ' + nom);
      // console.log(socket.rooms);
      io.to(nom).emit('update message', message, roomID);
    });
  });
};
