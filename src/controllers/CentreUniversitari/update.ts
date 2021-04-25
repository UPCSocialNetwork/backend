import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import CentreUniversitari from '../../models/CentreUniversitari';
import { addCentreUniversitariSchema } from './add';

// Error: se duplica el centro
const update: RequestHandler = async (req, res) => {
  const { nomComplet, nomSigles, localitzacio } = req.body;

  const centreUniversitari = new CentreUniversitari({ nomComplet, nomSigles, localitzacio });
  try {
    await centreUniversitari.save();
  } catch (e) { res.send({ message: e }); };

  res.send({
    message: 'Updated',
    CentreUniversitari: centreUniversitari.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: addCentreUniversitariSchema } });
