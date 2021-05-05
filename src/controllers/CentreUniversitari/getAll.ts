import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import CentreUniversitari from '../../models/CentreUniversitari';

const all: RequestHandler = async (req, res) => {
  let centreUniversitari = null;
  try {
    centreUniversitari = await CentreUniversitari.find();
  } catch (e) {
    return res.send({ message: e });
  };
  return res.send({ centreUniversitari });
};

export default requestMiddleware(all);
