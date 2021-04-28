import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Assignatura, { IAssignatura } from '../../models/Assignatura';

const getOne: RequestHandler = async (req, res) => {
  const { nomSigles } = req.body;
  let assignatura: IAssignatura = null;
  try {
    assignatura = await Assignatura.findOne({ nomSigles });
  } catch (e) {
    res.send({ e });
  };
  if (!assignatura) return res.send({ message: 'Assignatura not found' });
  return res.send({ assignatura });
};

export default requestMiddleware(getOne);
