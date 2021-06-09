/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import XatAssignatura from '../../models/XatAssignatura';

export const addXatAssignaturaSchema = Joi.object().keys({
  assignaturaID: Joi.string().required(),
  grauID: Joi.string().required(),
  guiaDocent: Joi.string(),
  mailProfessor: Joi.array().required(),
  delegatID: Joi.string().required(),
  titol: Joi.string().required(),
  descripcio: Joi.string(),
  imatge: Joi.string(),
  ultimMissatgeID: Joi.string()
});

const add: RequestHandler = async (req, res) => {
  const { assignaturaID, grauID, guiaDocent, mailProfessor, delegatID, titol, descripcio, imatge, ultimMissatgeID } =
    req.body;
  const xatAssignatura = new XatAssignatura({
    assignaturaID,
    grauID,
    guiaDocent,
    mailProfessor,
    delegatID,
    titol,
    descripcio,
    imatge,
    ultimMissatgeID
  });
  try {
    await xatAssignatura.save();
  } catch (e) {
    return res.send({
      message: e
    });
  }

  return res.send({
    message: 'Saved',
    XatAssignatura: xatAssignatura.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addXatAssignaturaSchema } });
