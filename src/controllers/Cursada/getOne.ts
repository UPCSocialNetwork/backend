import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Cursada, { ICursada } from '../../models/Cursada';

const getOne: RequestHandler = async (req, res) => {
  const { estudiantID, assignaturaID } = req.body;
  let cursada: ICursada = null;
  try {
    cursada = await Cursada.findOne({ estudiantID, assignaturaID });
  } catch (e) {
    return res.send({ e });
  };
  if (!cursada) return res.send({ message: 'Assignatura no cursada' });
  return res.send({ cursada });
};

export default requestMiddleware(getOne);
