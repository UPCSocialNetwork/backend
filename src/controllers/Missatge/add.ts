import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Missatge from '../../models/Missatge';

export const addMissatgeSchema = Joi.object().keys({
  estudiantID: Joi.string().required(),
  xatID: Joi.string().required(),
  text: Joi.string().required()
});

const add: RequestHandler = async (req, res) => {
  const { estudiantID, xatID, text } = req.body;

  const missatge = new Missatge({ estudiantID, xatID, text });
  try {
    await missatge.save();
  } catch (e) {
    return res.send({
      message: e
    });
  };

  return res.send({
    message: 'Saved',
    Grau: missatge.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addMissatgeSchema } });