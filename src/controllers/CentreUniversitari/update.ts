/* eslint-disable max-len */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import CentreUniversitari, { ICentreUniversitari } from '../../models/CentreUniversitari';
import { addCentreUniversitariSchema } from './add';

// Error: se duplica el centro
const update: RequestHandler = async (req, res) => {
  const { nomComplet, nomSigles, localitzacio } = req.body;
  let centre: ICentreUniversitari = null;
  try {
    centre = await CentreUniversitari.findOne({ nomSigles });
    centre.nomComplet = nomComplet;
    centre.nomSigles = nomSigles;
    centre.localitzacio = localitzacio;
    centre.save();
  } catch (e) { res.send({ message: e }); };
  if (!centre) res.send({ message: 'CentreUniversitari not found' });
  res.send({
    message: 'Updated Centre',
    CentreUniversitari: centre.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: addCentreUniversitariSchema } });
