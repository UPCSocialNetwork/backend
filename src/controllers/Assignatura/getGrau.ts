import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Assignatura, { IAssignatura } from '../../models/Assignatura';

const getGrau: RequestHandler = async (req, res) => {
  const { grauID } = req.body;
  let assignatura: IAssignatura[] = null;
  try {
    assignatura = await Assignatura.find({ grauID });
  } catch (e) {
    return res.send({ e });
  }
  if (!assignatura) return res.send({ message: 'Assignatura not found' });
  return res.send({ assignatura });
};

export default requestMiddleware(getGrau);
