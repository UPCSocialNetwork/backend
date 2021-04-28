/* eslint-disable max-len */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Estudiant, { IEstudiant } from '../../models/Estudiant';
import { addEstudiantSchema } from './add';

// Error: se duplica el centro
const update: RequestHandler = async (req, res) => {
  const {
    nomComplet, mail, contrasenya, descripcio, mentorID, LlistaAssignatures, LlistaXatGrupTancat
  } = req.body;
  let estudiant: IEstudiant = null;
  try {
    estudiant = await Estudiant.findOne({ mail });
    estudiant.nomComplet = nomComplet;
    estudiant.mail = mail;
    estudiant.contrasenya = contrasenya;
    estudiant.descripcio = descripcio;
    estudiant.mentorID = mentorID;
    estudiant.LlistaAssignatures = LlistaAssignatures;
    estudiant.LlistaXatGrupTancat = LlistaXatGrupTancat;
    estudiant.save();
  } catch (e) { res.send({ message: e }); };
  if (!estudiant) res.send({ message: 'Estudiant not found' });
  res.send({
    message: 'Updated Centre',
    Estudiant: estudiant.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: addEstudiantSchema } });
