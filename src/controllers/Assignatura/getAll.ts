import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Assignatura from '../../models/Assignatura';

const all: RequestHandler = async (req, res) => {
  let assignatura = null;
  try {
    assignatura = await Assignatura.find();
  } catch (e) {
    res.send({ message: e });
  };
  res.send({ assignatura });
};

export default requestMiddleware(all);
