import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatAssignatura from '../../models/XatAssignatura';

const deleteXatAssignatura: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await XatAssignatura.findByIdAndDelete({ _id: id });
  } catch (error) { return res.send({ message: error }); }
  return res.send(
    { message: 'XatAssignatura deleted Successfully!' }
  );
};

export default requestMiddleware(deleteXatAssignatura);
