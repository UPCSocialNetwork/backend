/* eslint-disable prefer-const */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable prefer-template */
/* eslint-disable no-console */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Missatge from '../../models/Missatge';
import Participant from '../../models/Participant';

const xat: RequestHandler = async (req, res) => {
  const { id } = req.params;
  let participants;
  try {
    participants = await Participant.find({ xatID: id });
  } catch (e) {
    return res.send({ e });
  }
  let missatges = [];
  try {
    for (let i = 0; i < participants.length; i++) {
      const element = participants[i];
      let miss = await Missatge.find({ participantID: element._id });
      if (miss.length > 0) missatges.push([element.estudiantID, miss]);
    }
  } catch (e) {
    return res.send({ e });
  }
  if (!missatges) return res.send({ message: 'Missatges del xat not found' });
  return res.send({ missatges });
};

export default requestMiddleware(xat);
