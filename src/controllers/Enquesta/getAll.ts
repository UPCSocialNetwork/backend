import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Enquesta from '../../models/Enquesta';

const all: RequestHandler = async (req, res) => {
  let enquesta = null;
  try {
    enquesta = await Enquesta.find();
  } catch (e) {
    return res.send({ message: e });
  };
  return res.send({ enquesta });
};

export default requestMiddleware(all);
