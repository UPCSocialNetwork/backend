import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Grau from '../../models/Grau';

const all: RequestHandler = async (req, res) => {
  let grau = null;
  try {
    grau = await Grau.find();
  } catch (e) {
    res.send({ message: e });
  };
  res.send({ grau });
};

export default requestMiddleware(all);
