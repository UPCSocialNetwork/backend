import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatMentor from '../../models/XatMentor';

const all: RequestHandler = async (req, res) => {
  let xatMentor = null;
  try {
    xatMentor = await XatMentor.find();
  } catch (e) {
    return res.send({ message: e });
  };
  return res.send({ xatMentor });
};

export default requestMiddleware(all);
