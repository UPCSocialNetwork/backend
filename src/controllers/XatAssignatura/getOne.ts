import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatAssignatura, { IXatAssignatura } from '../../models/XatAssignatura';

const getOne: RequestHandler = async (req, res) => {
  const { id } = req.params;
  let xatAssignatura: IXatAssignatura = null;
  try {
    xatAssignatura = await XatAssignatura.findById({ _id: id });
  } catch (error) {
    return res.send({ error });
  };
  if (!xatAssignatura) return res.send({ message: 'XatAssignatura not found' });
  return res.send({ xatAssignatura });
};

export default requestMiddleware(getOne);
