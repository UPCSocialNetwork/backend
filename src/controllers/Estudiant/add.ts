import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Estudiant from '../../models/Estudiant';

export const addEstudiantSchema = Joi.object().keys({
  nomComplet: Joi.string().required(),
  mail: Joi.string().required(),
  contrasenya: Joi.string().required(),
  descripcio: Joi.string().required(),
  mentorID: Joi.string().required(),
  LlistaAssignatures: Joi.array().required(),
  LlistaXatGrupTancat: Joi.array().required()
});

const add: RequestHandler = async (req, res) => {
  const {
    nomComplet, mail, contrasenya, descripcio, mentorID, LlistaAssignatures, LlistaXatGrupTancat
  } = req.body;

  const estudiant = new Estudiant({
    nomComplet, mail, contrasenya, descripcio, mentorID, LlistaAssignatures, LlistaXatGrupTancat
  });
  try {
    await estudiant.save();
  } catch (e) {
    res.send({ message: e });
  };

  res.send({
    message: 'Saved',
    Estudiant: estudiant.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addEstudiantSchema } });
