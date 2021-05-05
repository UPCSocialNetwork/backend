import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import CentreUniversitari, { ICentreUniversitari } from '../../models/CentreUniversitari';
import { addCentreUniversitariSchema } from './add';

const update: RequestHandler = async (req, res) => {
  const { nomComplet, nomSigles, localitzacio } = req.body;
  let centre: ICentreUniversitari = null;
  try {
    centre = await CentreUniversitari.findOne({ nomSigles });
    centre.nomComplet = nomComplet;
    centre.nomSigles = nomSigles;
    centre.localitzacio = localitzacio;
    await centre.save();
  } catch (e) { return res.send({ message: e }); };
  if (!centre) return res.send({ message: 'CentreUniversitari not found' });
  return res.send({
    message: 'Updated Centre',
    CentreUniversitari: centre.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: addCentreUniversitariSchema } });
