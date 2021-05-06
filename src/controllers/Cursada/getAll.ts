import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Cursada from '../../models/Cursada';

const all: RequestHandler = async (req, res) => {
  let cursada = null;
  try {
    cursada = await Cursada.find();
  } catch (e) {
    return res.send({ message: e });
  };
  return res.send({ cursada });
};

export default requestMiddleware(all);
