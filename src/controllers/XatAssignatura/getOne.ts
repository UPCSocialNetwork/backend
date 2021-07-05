import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatAssignatura, { IXatAssignatura } from '../../models/XatAssignatura';

const getOne: RequestHandler = async (req, res) => {
  const { titol, grauID } = req.body;
  let xatAssignatura: IXatAssignatura = null;
  try {
    xatAssignatura = await XatAssignatura.findOne({ titol, grauID });
  } catch (error) {
    return res.send({ error });
  }
  if (!xatAssignatura) return res.send({ message: 'XatAssignatura not found' });
  return res.send({ xatAssignatura });
};

export default requestMiddleware(getOne);
