/* eslint-disable max-len */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatGrupal, { IXatGrupal } from '../../models/XatGrupal';

const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

export const updateXatSchema = Joi.object().keys({
  ultimMissatgeID: Joi.string().required()
});

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { ultimMissatgeID } = req.body;
  let xatGrupal = null;
  try {
    xatGrupal = await XatGrupal.updateOne({ _id: id }, { $set: { ultimMissatgeID } });
  } catch (e) {
    return res.send({ message: e });
  }
  if (!xatGrupal) return res.send({ message: 'XatGrupal not found' });
  return res.send({
    message: 'Updated XatGrupal',
    XatGrupal: xatGrupal
  });
};

export default requestMiddleware(update, { validation: { body: updateXatSchema } });
