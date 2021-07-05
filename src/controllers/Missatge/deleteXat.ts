/* eslint-disable no-shadow */
/* eslint-disable arrow-parens */
/* eslint-disable no-console */
/* eslint-disable semi */
/* eslint-disable import/newline-after-import */
/* eslint-disable max-len */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Missatge, { IMissatge } from '../../models/Missatge';
import Participant, { IParticipant } from '../../models/Participant';

const deleteMissatgeXat: RequestHandler = async (req, res) => {
  const { id } = req.params;
  let parts = null;
  try {
    parts = await Participant.find({ xatID: id });
  } catch (e) {
    return res.send({ message: e });
  }
  try {
    parts.forEach(async (element) => {
      const missatge = await Missatge.find({ participantID: element._id });
      if (missatge.length > 0) {
        missatge.forEach(async (element) => {
          await Missatge.findByIdAndDelete(element._id);
        });
      }
    });
  } catch (e) {
    return res.send({ message: e });
  }
  return res.send({ message: 'Missatges deleted Successfully!' });
};

export default requestMiddleware(deleteMissatgeXat);
