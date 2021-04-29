import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Grau, { IGrau } from '../../models/Grau';

const getOne: RequestHandler = async (req, res) => {
  const { nom } = req.body;
  let grau: IGrau = null;
  try {
    grau = await Grau.findOne({ nom });
  } catch (e) {
    return res.send({ e });
  };
  if (!grau) return res.send({ message: 'Grau not found' });
  return res.send({ grau });
};

export default requestMiddleware(getOne);
