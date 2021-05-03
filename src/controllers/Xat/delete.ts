/* eslint-disable max-len */
import Joi from '@hapi/joi';
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Xat from '../../models/Xat';

export const deleteXatSchema = Joi.object().keys({
  xatID: Joi.string().required()
});

const deleteXat: RequestHandler = async (req, res) => {
  const { xatID } = req.body;
  try {
    await Xat.findByIdAndDelete(xatID);
  } catch (e) { return res.send({ message: e }); }
  return res.send(
    { message: 'Xat deleted Successfully!' }
  );
};

export default requestMiddleware(deleteXat, { validation: { body: deleteXatSchema } });
