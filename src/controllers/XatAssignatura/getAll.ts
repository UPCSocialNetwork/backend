import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatAssignatura from '../../models/XatAssignatura';

const all: RequestHandler = async (req, res) => {
  let xatAssignatura = null;
  try {
    xatAssignatura = await XatAssignatura.find();
  } catch (e) {
    return res.send({ message: e });
  };
  return res.send({ xatAssignatura });
};

export default requestMiddleware(all);
