/* eslint-disable max-len */
import Joi from '@hapi/joi';
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Missatge, { IMissatge } from '../../models/Missatge';

export const deleteMissatgeSchema = Joi.object().keys({
    estudiantID: Joi.string().required(),
    xatID: Joi.string().required()
});

const deleteMissatge: RequestHandler = async (req, res) => {
  const { estudiantID, xatID } = req.body;
  let missatge: IMissatge = null;
  try {
    missatge = await Missatge.findOne({ estudiantID, xatID });
  } catch (e) {
    return res.send({ e });
  };
  try {
    await Missatge.findByIdAndDelete(missatge._id);
  } catch (e) { return res.send({ message: e }); }
  return res.send(
    { message: 'Missatge deleted Successfully!' }
  );
};

export default requestMiddleware(deleteMissatge, { validation: { body: deleteMissatgeSchema } });
