import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Assignatura, { IAssignatura } from '../../models/Assignatura';
import { addAssignaturaSchema } from './add';

const update: RequestHandler = async (req, res) => {
  const {
    nomComplet, nomSigles, quadrimestre, credits, grauID, xatAssignaturaID, LlistaEstudiants
  } = req.body;
  let assignatura: IAssignatura = null;
  try {
    assignatura = await Assignatura.findOne({ nomSigles });
    assignatura.nomComplet = nomComplet;
    assignatura.nomSigles = nomSigles;
    assignatura.quadrimestre = quadrimestre;
    assignatura.credits = credits;
    assignatura.grauID = grauID;
    assignatura.xatAssignaturaID = xatAssignaturaID;
    assignatura.LlistaEstudiants = LlistaEstudiants;
    await assignatura.save();
  } catch (e) { return res.send({ message: e }); };
  if (!assignatura) return res.send({ message: 'Assignatura not found' });
  return res.send({
    message: 'Updated Assignatura',
    Assignatura: assignatura.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: addAssignaturaSchema } });
