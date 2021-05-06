/* eslint-disable max-len */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Enquesta, { IEnquesta } from '../../models/Enquesta';
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

export const deleteEnquestaSchema = Joi.object().keys({
    _id: Joi.objectId().required()
  });

const deleteEnquesta: RequestHandler = async (req, res) => {
  const { _id } = req.body;
  try {
    await Enquesta.findByIdAndDelete(_id);
  } catch (e) { return res.send({ message: e }); }
  return res.send(
    { message: 'Enquesta deleted Successfully!' }
  );
};

export default requestMiddleware(deleteEnquesta, { validation: { body: deleteEnquestaSchema } });
