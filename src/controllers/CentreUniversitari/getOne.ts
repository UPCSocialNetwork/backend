import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import CentreUniversitari, { ICentreUniversitari } from '../../models/CentreUniversitari';

const getOne: RequestHandler = async (req, res) => {
  const { nomSigles } = req.body;
  let centreUniversitari: ICentreUniversitari = null;
  try {
    centreUniversitari = await CentreUniversitari.findOne({ nomSigles });
  } catch (e) {
    return res.send({ e });
  };
  if (!centreUniversitari) return res.send({ message: 'CentreUniversitari not found' });
  return res.send({ centreUniversitari });
};

export default requestMiddleware(getOne);
