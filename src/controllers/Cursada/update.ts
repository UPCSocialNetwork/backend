import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Cursada, { ICursada } from '../../models/Cursada';
import { addCursadaSchema } from './add';

// Error: se duplica el centro
const update: RequestHandler = async (req, res) => {
  const { estudiantID, assignaturaID, situacioActual, numVegades } = req.body;
  let cursada : ICursada = null;
  try {
    cursada = await Cursada.findOne({ estudiantID, assignaturaID });
    cursada.estudiantID = estudiantID;
    cursada.assignaturaID = assignaturaID;
    cursada.situacioActual = situacioActual;
    cursada.numVegades = numVegades;
    await cursada.save();
  } catch (e) { return res.send({ message: e }); };
  if (!cursada) return res.send({ message: 'Cursada not found' });
  return res.send({
    message: 'Updated Cursada',
    Cursada: cursada.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: addCursadaSchema } });
