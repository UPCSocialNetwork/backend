import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatMentor, { IXatMentor } from '../../models/XatMentor';

const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

export const updateXatSchema = Joi.object().keys({
  ultimMissatgeID: Joi.string().required()
});

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { ultimMissatgeID } = req.body;
  let xatMentor = null;
  try {
    xatMentor = await XatMentor.updateOne({ _id: id }, { $set: { ultimMissatgeID } });
  } catch (e) {
    return res.send({ message: e });
  }
  if (!xatMentor) return res.send({ message: 'XatMentor not found' });
  return res.send({
    message: 'Updated XatMentor',
    XatMentor: xatMentor
  });
};

export default requestMiddleware(update, { validation: { body: updateXatSchema } });
