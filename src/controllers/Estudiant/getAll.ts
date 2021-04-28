import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Estudiant from '../../models/Estudiant';

const all: RequestHandler = async (req, res) => {
  let estudiant = null;
  try {
    estudiant = await Estudiant.find();
  } catch (e) {
    res.send({ message: e });
  };
  res.send({ estudiant });
};

export default requestMiddleware(all);
