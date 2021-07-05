import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Assignatura, { IAssignatura } from '../../models/Assignatura';

const getOne: RequestHandler = async (req, res) => {
  const { nomComplet, grauID } = req.body;
  let assignatura: IAssignatura = null;
  try {
    assignatura = await Assignatura.findOne({ nomComplet, grauID });
  } catch (e) {
    return res.send({ e });
  };
  if (!assignatura) return res.send({ message: 'Assignatura not found' });
  return res.send({ assignatura });
};

export default requestMiddleware(getOne);
