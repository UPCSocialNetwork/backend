import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Estudiant, { IEstudiant } from '../../models/Estudiant';
import { addEstudiantSchema } from './add';

const update: RequestHandler = async (req, res) => {
  const {
    nomComplet, mail, contrasenya, descripcio, mentorID, interessos, LlistaAssignatures, LlistaXatGrupTancat
  } = req.body;
  let estudiant: IEstudiant = null;
  try {
    estudiant = await Estudiant.findOne({ mail });
    estudiant.nomComplet = nomComplet;
    estudiant.mail = mail;
    estudiant.contrasenya = contrasenya;
    estudiant.descripcio = descripcio;
    estudiant.mentorID = mentorID;
    estudiant.interessos = interessos;
    estudiant.LlistaAssignatures = LlistaAssignatures;
    estudiant.LlistaXatGrupTancat = LlistaXatGrupTancat;
    await estudiant.save();
  } catch (e) { return res.send({ message: e }); };
  if (!estudiant) return res.send({ message: 'Estudiant not found' });
  return res.send({
    message: 'Updated Estudiant',
    Estudiant: estudiant.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: addEstudiantSchema } });
