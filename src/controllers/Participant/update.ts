import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Participant, { IParticipant } from '../../models/Participant';
import { addParticipantSchema } from './add';

const update: RequestHandler = async (req, res) => {
  const { estudiantID, xatID, ultimaLectura, notificacions, bloqueigGrup } = req.body;
  const participant: IParticipant = null;
  try {
    // eslint-disable-next-line no-shadow
    const participant = await Participant.findOne({ estudiantID, xatID });
    participant.estudiantID = estudiantID;
    participant.xatID = xatID;
    if (ultimaLectura === 0) participant.ultimaLectura = 0;
    else participant.ultimaLectura += 1;
    participant.notificacions = notificacions;
    participant.bloqueigGrup = bloqueigGrup;
    await participant.save();
  } catch (e) {
    return res.send({ message: e });
  }
  if (!participant) return res.send({ message: 'Participant not found' });
  return res.send({
    message: 'Updated Participant',
    Participant: participant.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: addParticipantSchema } });
