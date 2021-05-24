import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Estudiant, { IEstudiant } from '../../models/Estudiant';
import { addEstudiantSchema } from './add';

export const updateEstudiantSchema = Joi.object().keys({
  mail: Joi.string().required(),
  contrasenya: Joi.string().required(),
  descripcio: Joi.string().required(),
  centreID: Joi.string().required(),
  grauID: Joi.string().required(),
  mentorID: Joi.string().required(),
  interessos: Joi.array(),
  LlistaAssignatures: Joi.array().required(),
  LlistaXatGrupTancat: Joi.array().required()
});

const update: RequestHandler = async (req, res) => {
  const {
    mail,
    contrasenya,
    descripcio,
    centreID,
    grauID,
    mentorID,
    interessos,
    LlistaAssignatures,
    LlistaXatGrupTancat
  } = req.body;
  const { id } = req.params;
  let estudiant: IEstudiant = null;
  try {
    estudiant = await Estudiant.findOne({ nomUsuari: id });
    estudiant.mail = mail;
    estudiant.contrasenya = contrasenya;
    estudiant.descripcio = descripcio;
    estudiant.centreID = centreID;
    estudiant.grauID = grauID;
    estudiant.mentorID = mentorID;
    estudiant.interessos = interessos;
    estudiant.LlistaAssignatures = LlistaAssignatures;
    estudiant.LlistaXatGrupTancat = LlistaXatGrupTancat;
    await estudiant.save();
  } catch (e) {
    return res.send({ message: e });
  }
  if (!estudiant) return res.send({ message: 'Estudiant not found' });
  return res.send({
    message: 'Updated Estudiant',
    Estudiant: estudiant.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: updateEstudiantSchema } });
