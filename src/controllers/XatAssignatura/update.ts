/* eslint-disable max-len */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatAssignatura, { IXatAssignatura } from '../../models/XatAssignatura';

const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

export const updateXatSchema = Joi.object().keys({
  ultimMissatgeID: Joi.string().required()
});

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { ultimMissatgeID } = req.body;
  let xatAssignatura = null;
  try {
    xatAssignatura = await XatAssignatura.updateOne({ _id: id }, { $set: { ultimMissatgeID } });
  } catch (e) {
    return res.send({ message: e });
  }
  if (!xatAssignatura) return res.send({ message: 'XatAssignatura not found' });
  return res.send({
    message: 'Updated XatAssignatura',
    XatAssignatura: xatAssignatura
  });
};

export default requestMiddleware(update, { validation: { body: updateXatSchema } });
