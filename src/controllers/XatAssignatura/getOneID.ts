import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatAssignatura, { IXatAssignatura } from '../../models/XatAssignatura';

const getOneID: RequestHandler = async (req, res) => {
  const { id } = req.params;
  let xatAssignatura: IXatAssignatura = null;
  try {
    xatAssignatura = await XatAssignatura.findById({ _id: id });
    if (!xatAssignatura) return res.send({ message: 'XatAssignatura not found' });
    return res.send({ xatAssignatura });
  } catch (error) {
    return res.send({ error });
  }
};

export default requestMiddleware(getOneID);
