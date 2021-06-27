import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Estudiant, { IEstudiant } from '../../models/Estudiant';
import { registerEstudiantSchema } from './signup';

export const updateEstudiantSchema = Joi.object().keys({
  // mail: Joi.string().required(),
  // contrasenya: Joi.string().required(),
  descripcio: Joi.string().required(),
  // centreID: Joi.string().required(),
  // grauID: Joi.string().required(),
  // esMentor: Joi.boolean().required(),
  interessos: Joi.array().required()
  // xatMentorID: Joi.string().required(),
  // LlistaAssignatures: Joi.array().required(),
  // LlistaXatGrupTancat: Joi.array().required()
});

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { descripcio, interessos } = req.body;
  let estudiant = null;
  try {
    estudiant = await Estudiant.updateOne({ nomUsuari: id }, { $set: { descripcio, interessos } });
  } catch (e) {
    return res.send({ message: e });
  }
  if (!estudiant) return res.send({ message: 'Estudiant not found' });
  return res.send({
    message: 'Updated',
    Estudiant: estudiant
  });
};

export default requestMiddleware(update, { validation: { body: updateEstudiantSchema } });
