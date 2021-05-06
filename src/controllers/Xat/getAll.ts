import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Xat from '../../models/Xat';

const all: RequestHandler = async (req, res) => {
  let xat = null;
  try {
    xat = await Xat.find();
  } catch (e) {
    return res.send({ message: e });
  };
  return res.send({ xat });
};

export default requestMiddleware(all);
