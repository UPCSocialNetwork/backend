import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Grau, { IGrau } from '../../models/Grau';
import { addGrauSchema } from './add';

// Error: se duplica el centro
const update: RequestHandler = async (req, res) => {
  const { nom, credits, centreUniversitariID } = req.body;
  let grau : IGrau = null;
  try {
    grau = await Grau.findOne({ nom });
    //await grau.save();
  } catch (e) { res.send({ message: e }); };
  if (!grau){
    res.send({
      message: 'Grau not found'
    });
  } else {
    await Grau.findByIdAndDelete(grau._id);
    const nouGrau = new Grau({ nom, credits, centreUniversitariID });
    await nouGrau.save();
    res.send({
      message: 'Grau updated',
      Grau: nouGrau.toJSON()
    });
  }
};

export default requestMiddleware(update, { validation: { body: addGrauSchema } });
