/* eslint-disable max-len */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatGrupTancat from '../../models/XatGrupTancat';

const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

export const updateXatSchema = Joi.object().keys({
  ultimMissatgeID: Joi.string().required()
});

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { ultimMissatgeID } = req.body;
  let xatGrupTancat = null;
  try {
    xatGrupTancat = await XatGrupTancat.updateOne({ _id: id }, { $set: { ultimMissatgeID } });
  } catch (e) {
    return res.send({ message: e });
  }
  if (!xatGrupTancat) return res.send({ message: 'XatGrupTancat not found' });
  return res.send({
    message: 'Updated XatGrupTancat',
    XatGrupTancat: xatGrupTancat
  });
};

export default requestMiddleware(update, { validation: { body: updateXatSchema } });
