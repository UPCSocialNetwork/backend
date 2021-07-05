import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatMentor from '../../models/XatMentor';

const deleteXatMentor: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await XatMentor.findByIdAndDelete({ _id: id });
  } catch (error) { return res.send({ message: error }); }
  return res.send(
    { message: 'XatMentor deleted Successfully!' }
  );
};

export default requestMiddleware(deleteXatMentor);
