import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Assignatura, { IAssignatura } from '../../models/Assignatura';
import { addAssignaturaSchema } from './add';

const update: RequestHandler = async (req, res) => {
  const {
    nomComplet, nomSigles, quadrimestre, credits, tipus, mailProfessor, grauID, xatAssignaturaID, LlistaEstudiants
  } = req.body;
  let assignatura: IAssignatura = null;
  try {
    assignatura = await Assignatura.findOne({ nomComplet, grauID });
    assignatura.nomComplet = nomComplet;
    assignatura.nomSigles = nomSigles;
    assignatura.quadrimestre = quadrimestre;
    assignatura.credits = credits;
    assignatura.tipus = tipus;
    assignatura.mailProfessor = mailProfessor;
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
