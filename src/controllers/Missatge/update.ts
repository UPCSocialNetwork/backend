import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Missatge, { IMissatge } from '../../models/Missatge';
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

export const updateMissatgeSchema = Joi.object().keys({
  _id: Joi.objectId().required(),
  text: Joi.string().required(),
  participantID: Joi.string().required()
});

const update: RequestHandler = async (req, res) => {
  const { _id, text, participantID } = req.body;
  let missatge : IMissatge = null;
  try {
    missatge = await Missatge.findById({ _id });
    missatge.text = text;
    missatge.participantID = participantID;
    await missatge.save();
  } catch (e) { return res.send({ message: e }); };
  if (!missatge) return res.send({ message: 'Missatge not found' });
  return res.send({
    message: 'Updated Missatge',
    Missatge: missatge.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: updateMissatgeSchema } });
