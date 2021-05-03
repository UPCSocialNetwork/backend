/* eslint-disable max-len */
import Joi from '@hapi/joi';
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Enquesta, { IEnquesta } from '../../models/Enquesta';

export const deleteEnquestaSchema = Joi.object().keys({
    id: Joi.string().required()
  });

const deleteEnquesta: RequestHandler = async (req, res) => {
  const { id } = req.body;
  try {
    await Enquesta.findByIdAndDelete(id);
  } catch (e) { return res.send({ message: e }); }
  return res.send(
    { message: 'Enquesta deleted Successfully!' }
  );
};

export default requestMiddleware(deleteEnquesta, { validation: { body: deleteEnquestaSchema } });
