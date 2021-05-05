import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Grau, { IGrau } from '../../models/Grau';
import { addGrauSchema } from './add';

const update: RequestHandler = async (req, res) => {
  const { nom, credits, centreUniversitariID } = req.body;
  let grau : IGrau = null;
  try {
    grau = await Grau.findOne({ nom });
    grau.nom = nom;
    grau.credits = credits;
    grau.centreUniversitariID = centreUniversitariID;
    await grau.save();
  } catch (e) { return res.send({ message: e }); };
  if (!grau) return res.send({ message: 'Grau not found' });
  return res.send({
    message: 'Updated Grau',
    Grau: grau.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: addGrauSchema } });
