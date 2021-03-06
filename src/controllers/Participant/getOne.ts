/* eslint-disable prefer-template */
/* eslint-disable no-console */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Participant, { IParticipant } from '../../models/Participant';

const getOne: RequestHandler = async (req, res) => {
  const { est, xat } = req.params;
  let participant: IParticipant = null;
  try {
    participant = await Participant.findOne({ estudiantID: est, xatID: xat });
  } catch (e) {
    return res.send({ e });
  }
  if (!participant) return res.send({ message: 'No es troba el participant' });
  return res.send({ participant });
};

export default requestMiddleware(getOne);
