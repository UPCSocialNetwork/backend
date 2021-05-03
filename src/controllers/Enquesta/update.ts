import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Enquesta, { IEnquesta } from '../../models/Enquesta';
import { addEnquestaSchema } from './add';

// Error: se duplica el centro
const update: RequestHandler = async (req, res) => {
  const { _id, titol, descripcio, llistaOpcions, xatID } = req.body;
  let enquesta : IEnquesta = null;
  try {
    enquesta = await Enquesta.findById({ _id });
    enquesta.titol = titol;
    enquesta.descripcio = descripcio;
    enquesta.llistaOpcions = llistaOpcions;
    enquesta.xatID = xatID;
    await enquesta.save();
  } catch (e) { return res.send({ message: e }); };
  if (!enquesta) return res.send({ message: 'Enquesta not found' });
  return res.send({
    message: 'Updated Enquesta',
    Grau: enquesta.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: addEnquestaSchema } });
