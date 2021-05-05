import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Enquesta from '../../models/Enquesta';

export const addEnquestaSchema = Joi.object().keys({
  titol: Joi.string().required(),
  descripcio: Joi.string().required(),
  temps: Joi.number().required(),
  llistaOpcions: Joi.array().required(),
  xatID: Joi.string().required()
});

const add: RequestHandler = async (req, res) => {
  const { titol, descripcio, temps, llistaOpcions, xatID } = req.body;
  const enquesta = new Enquesta({ titol, descripcio, temps, llistaOpcions, xatID });
  try {
    await enquesta.save();
  } catch (e) {
    return res.send({
      message: e
    });
  };

  return res.send({
    message: 'Saved',
    Enquesta: enquesta.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addEnquestaSchema } });
