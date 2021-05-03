import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Enquesta, { IEnquesta } from '../../models/Enquesta';

const getOne: RequestHandler = async (req, res) => {
  const { _id } = req.body;
  let enquesta: IEnquesta = null;
  try {
    enquesta = await Enquesta.findById({ _id });
  } catch (e) {
    return res.send({ e });
  };
  if (!enquesta) return res.send({ message: 'Enquesta not found' });
  return res.send({ enquesta });
};

export default requestMiddleware(getOne);
