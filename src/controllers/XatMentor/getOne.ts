import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatMentor, { IXatMentor } from '../../models/XatMentor';

const getOne: RequestHandler = async (req, res) => {
  const { mentorID } = req.params;
  let xatMentor: IXatMentor = null;
  try {
    xatMentor = await XatMentor.findOne({ mentorID });
  } catch (error) {
    return res.send({ error });
  }
  if (!xatMentor) return res.send({ message: 'XatMentor not found' });
  return res.send({ xatMentor });
};

export default requestMiddleware(getOne);
