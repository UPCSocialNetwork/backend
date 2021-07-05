import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Estudiant from '../../models/Estudiant';
import VerificationToken from '../../models/VerificationToken';
import { sendVerificationEmail } from '../../email';

export const registerEstudiantSchema = Joi.object().keys({
  nomUsuari: Joi.string().required(),
  mail: Joi.string().required(),
  contrasenya: Joi.string().required(),
  descripcio: Joi.string().required(),
  centreID: Joi.string().required(),
  grauID: Joi.string().required(),
  esMentor: Joi.boolean().required(),
  interessos: Joi.array(),
  xatMentorID: Joi.string().required(),
  LlistaAssignatures: Joi.array().required(),
  LlistaXatGrupTancat: Joi.array().required()
});

const add: RequestHandler = async (req, res) => {
  const {
    nomUsuari,
    mail,
    contrasenya,
    descripcio,
    centreID,
    grauID,
    esMentor,
    interessos,
    xatMentorID,
    LlistaAssignatures,
    LlistaXatGrupTancat
  } = req.body;

  try {
    const estudiant = new Estudiant({
      nomUsuari,
      mail,
      contrasenya,
      descripcio,
      centreID,
      grauID,
      esMentor,
      interessos,
      xatMentorID,
      LlistaAssignatures,
      LlistaXatGrupTancat
    });
    await estudiant.save();

    const vtoken = new VerificationToken({ estudiant });
    await vtoken.save();

    // sendVerificationEmail(mail, vtoken.token);

    return res.send({
      message: 'Saved',
      Estudiant: estudiant.toJSON()
    });
  } catch (e) {
    return res.send({ message: e });
  }
};

export default requestMiddleware(add, { validation: { body: registerEstudiantSchema } });
