import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Assignatura from '../../models/Assignatura';

export const addAssignaturaSchema = Joi.object().keys({
  nomComplet: Joi.string().required(),
  nomSigles: Joi.string().required(),
  quadrimestre: Joi.string().required(),
  credits: Joi.string().required(),
  grauID: Joi.string().required(),
  xatAssignaturaID: Joi.string().required(),
  LlistaEstudiants: Joi.array().required()
});

const add: RequestHandler = async (req, res) => {
  const {
    nomComplet, nomSigles, quadrimestre, credits, grauID, xatAssignaturaID, LlistaEstudiants
  } = req.body;

  const assignatura = new Assignatura({
    nomComplet, nomSigles, quadrimestre, credits, grauID, xatAssignaturaID, LlistaEstudiants
  });
  try {
    await assignatura.save();
  } catch (e) {
    res.send({
      message: e
    });
  };

  res.send({
    message: 'Saved',
    Assignatura: assignatura.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addAssignaturaSchema } });
