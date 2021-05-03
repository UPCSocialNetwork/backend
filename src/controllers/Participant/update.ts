import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Participant, { IParticipant } from '../../models/Participant';
import { addParticipantSchema } from './add';

// Error: se duplica el centro
const update: RequestHandler = async (req, res) => {
  const { estudiantID, xatID, ultimaLectura, notificacions, bloqueigGrup } = req.body;
  let participant : IParticipant = null;
  try {
    participant = await Participant.findOne({ estudiantID, xatID });
    participant.estudiantID = estudiantID;
    participant.xatID = xatID;
    participant.ultimaLectura = ultimaLectura;
    participant.notificacions = notificacions;
    participant.bloqueigGrup = bloqueigGrup;
    await participant.save();
  } catch (e) { return res.send({ message: e }); };
  if (!participant) return res.send({ message: 'Participant not found' });
  return res.send({
    message: 'Updated Participant',
    Participant: participant.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: addParticipantSchema } });
