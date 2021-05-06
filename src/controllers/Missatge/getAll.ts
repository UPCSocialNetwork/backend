import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Missatge from '../../models/Missatge';

const all: RequestHandler = async (req, res) => {
  let missatge = null;
  try {
    missatge = await Missatge.find();
  } catch (e) {
    return res.send({ message: e });
  };
  return res.send({ missatge });
};

export default requestMiddleware(all);
