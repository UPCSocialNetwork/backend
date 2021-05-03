import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Missatge, { IMissatge } from '../../models/Missatge';

const getOne: RequestHandler = async (req, res) => {
  const { estudiantID, xatID } = req.body;
  let missatge: IMissatge = null;
  try {
    missatge = await Missatge.findOne({ estudiantID, xatID });
  } catch (e) {
    return res.send({ e });
  };
  if (!missatge) return res.send({ message: 'Missatge no trobat' });
  return res.send({ missatge });
};

export default requestMiddleware(getOne);
