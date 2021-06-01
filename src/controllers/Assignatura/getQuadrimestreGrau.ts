import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Assignatura, { IAssignatura } from '../../models/Assignatura';

const getQuadrimestreGrau: RequestHandler = async (req, res) => {
  const grauID = req.params.grau;
  const quadrimestre = Number(req.params.quad);
  let assignatura: IAssignatura[] = null;
  try {
    assignatura = await Assignatura.find({ grauID, quadrimestre });
  } catch (e) {
    return res.send({ e });
  }
  if (!assignatura) return res.send({ message: 'Assignatura not found' });
  return res.send({ assignatura });
};

export default requestMiddleware(getQuadrimestreGrau);
