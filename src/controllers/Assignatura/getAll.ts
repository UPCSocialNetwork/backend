import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Assignatura, { IAssignatura } from '../../models/Assignatura';

const all: RequestHandler = async (req, res) => {
  let assignatura: IAssignatura[] = null;
  try {
    assignatura = await Assignatura.find();
  } catch (e) {
    return res.send({ message: e });
  }
  return res.send({ assignatura });
};

export default requestMiddleware(all);
