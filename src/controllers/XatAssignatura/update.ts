/* eslint-disable max-len */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatAssignatura, { IXatAssignatura } from '../../models/XatAssignatura';

const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

export const updateXatAssignaturaSchema = Joi.object().keys({
  guiaDocent: Joi.string().required(),
  mailProfessor: Joi.array().required(),
  delegatID: Joi.string().required(),
  titol: Joi.string().required(),
  descripcio: Joi.string().required(),
  imatge: Joi.string().required(),
  ultimMissatge: Joi.string().required()
});

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const {
    guiaDocent, mailProfessor, delegatID, titol, descripcio, imatge, ultimMissatge
  } = req.body;
  let xatAssignatura: IXatAssignatura = null;
  try {
    xatAssignatura = await XatAssignatura.findById({ _id: id });
    xatAssignatura.guiaDocent = guiaDocent;
    xatAssignatura.mailProfessor = mailProfessor;
    xatAssignatura.delegatID = delegatID;
    xatAssignatura.titol = titol;
    xatAssignatura.descripcio = descripcio;
    xatAssignatura.imatge = imatge;
    xatAssignatura.ultimMissatge = ultimMissatge;
    await xatAssignatura.save();
  } catch (e) { return res.send({ message: e }); };
  if (!xatAssignatura) return res.send({ message: 'XatAssignatura not found' });
  return res.send({
    message: 'Updated XatAssignatura',
    XatAssignatura: xatAssignatura.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: updateXatAssignaturaSchema } });
