/* eslint-disable max-len */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Xat, { IXat } from '../../models/Xat';

const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

export const updateXatSchema = Joi.object().keys({
  ultimMissatgeID: Joi.string().required()
});

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { ultimMissatgeID } = req.body;
  let xat: IXat = null;
  try {
    xat = await Xat.findById({ _id: id });
    xat.ultimMissatgeID = ultimMissatgeID;
    await xat.save();
  } catch (e) {
    return res.send({ message: e });
  }
  if (!xat) return res.send({ message: 'Xat not found' });
  return res.send({
    message: 'Updated Xat',
    Xat: xat.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: updateXatSchema } });
