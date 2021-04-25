import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import CentreUniversitari from '../../models/CentreUniversitari';

const all: RequestHandler = async (req, res) => {
  let centreUniversitari = null;
  try {
    centreUniversitari = await CentreUniversitari.find();
  } catch (e) {
    res.send({ message: e });
  };
  res.send({ centreUniversitari });
};

export default requestMiddleware(all);
