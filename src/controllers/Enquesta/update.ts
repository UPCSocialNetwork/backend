import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Enquesta, { IEnquesta } from '../../models/Enquesta';
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

export const updateEnquestaSchema = Joi.object().keys({
  _id: Joi.objectId().required(),
  titol: Joi.string().required(),
  descripcio: Joi.string().required(),
  temps: Joi.number().required(),
  llistaOpcions: Joi.array().required(),
  xatID: Joi.string().required()
});

const update: RequestHandler = async (req, res) => {
  const { _id, titol, descripcio, temps, llistaOpcions, xatID } = req.body;
  let enquesta : IEnquesta = null;
  try {
    enquesta = await Enquesta.findById({ _id });
    enquesta.titol = titol;
    enquesta.descripcio = descripcio;
    enquesta.temps = temps;
    enquesta.llistaOpcions = llistaOpcions;
    enquesta.xatID = xatID;
    await enquesta.save();
  } catch (e) { return res.send({ message: e }); };
  if (!enquesta) return res.send({ message: 'Enquesta not found' });
  return res.send({
    message: 'Updated Enquesta',
    Grau: enquesta.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: updateEnquestaSchema } });
