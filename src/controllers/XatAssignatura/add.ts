/* eslint-disable max-len */
import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import XatAssignatura from '../../models/XatAssignatura';

export const addXatAssignaturaSchema = Joi.object().keys({
  assignaturaID: Joi.string().required(),
  guiaDocent: Joi.string().required(),
  grupAssignatura: Joi.string().required(),
  mailProfessor: Joi.string().required(),
  delegatID: Joi.string().required(),
  titol: Joi.string().required(),
  descripcio: Joi.string().required(),
  imatge: Joi.string().required(),
  ultimMissatge: Joi.string().required()
});

const add: RequestHandler = async (req, res) => {
  const {
    assignaturaID, guiaDocent, grupAssignatura, mailProfesor, delegatID, titol, descripcio, imatge, ultimMissatge
  } = req.body;
  const xatAssignatura = new XatAssignatura({
    assignaturaID, guiaDocent, grupAssignatura, mailProfesor, delegatID, titol, descripcio, imatge, ultimMissatge
  });
  try {
    await xatAssignatura.save();
  } catch (e) {
    return res.send({
      message: e
    });
  };

  return res.send({
    message: 'Saved',
    XatAssignatura: xatAssignatura.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addXatAssignaturaSchema } });
