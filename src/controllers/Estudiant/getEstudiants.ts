/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable no-console */
/* eslint-disable space-before-blocks */
/* eslint-disable no-lonely-if */
/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-const */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Participant from '../../models/Participant';
import Missatge from '../../models/Missatge';
import XatGrupTancat from '../../models/XatGrupTancat';
import XatAssignatura from '../../models/XatAssignatura';
import XatMentor from '../../models/XatMentor';

const getEstudiants: RequestHandler = async (req, res) => {
  const { id } = req.params;
  let participants;
  try {
    participants = await Participant.find({ xatID: id });
  } catch (e) {
    return res.send({ e });
  }
  if (!participants) return res.send({ message: 'Participants not found' });
  let persones: string[] = [];
  participants.forEach((element) => {
    persones.push(element.estudiantID);
  });
  return res.send({ persones });
};

export default requestMiddleware(getEstudiants);
