/* eslint-disable semi */
/* eslint-disable import/newline-after-import */
/* eslint-disable max-len */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Missatge, { IMissatge } from '../../models/Missatge';
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

export const deleteMissatgeSchema = Joi.object().keys({
  _id: Joi.objectId().required()
});

const deleteMissatge: RequestHandler = async (req, res) => {
  const { _id } = req.body;
  try {
    await Missatge.findByIdAndDelete(_id);
  } catch (e) {
    return res.send({ message: e });
  }
  return res.send({ message: 'Missatge deleted Successfully!' });
};

export default requestMiddleware(deleteMissatge, { validation: { body: deleteMissatgeSchema } });
