import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Missatge, { IMissatge } from '../../models/Missatge';
import { addMissatgeSchema } from './add';

// Error: se duplica el centro
const update: RequestHandler = async (req, res) => {
  const { estudiantID, xatID, text } = req.body;
  let missatge : IMissatge = null;
  try {
    missatge = await Missatge.findOne({ estudiantID, xatID });
    missatge.estudiantID = estudiantID;
    missatge.xatID = xatID;
    missatge.text = text;
    await missatge.save();
  } catch (e) { return res.send({ message: e }); };
  if (!missatge) return res.send({ message: 'Missatge not found' });
  return res.send({
    message: 'Updated Missatge',
    Missatge: missatge.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: addMissatgeSchema } });
