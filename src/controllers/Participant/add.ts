import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Participant from '../../models/Participant';

export const addParticipantSchema = Joi.object().keys({
  estudiantID: Joi.string().required(),
  xatID: Joi.string().required(),
  ultimaLectura: Joi.number().required(),
  notificacions: Joi.string().required(),
  bloqueigGrup: Joi.string().required()
});

const add: RequestHandler = async (req, res) => {
  const { estudiantID, xatID, ultimaLectura, notificacions, bloqueigGrup } = req.body;

  const participant = new Participant({ estudiantID, xatID, ultimaLectura, notificacions, bloqueigGrup });
  try {
    await participant.save();
  } catch (e) {
    return res.send({
      message: e
    });
  };

  return res.send({
    message: 'Saved',
    Grau: participant.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addParticipantSchema } });