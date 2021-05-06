/* eslint-disable max-len */
import Joi from '@hapi/joi';
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Cursada, { ICursada } from '../../models/Cursada';

export const deleteCursadaSchema = Joi.object().keys({
    estudiantID: Joi.string().required(),
    assignaturaID: Joi.string().required()
});

const deleteCursada: RequestHandler = async (req, res) => {
  const { estudiantID, assignaturaID } = req.body;
  let cursada: ICursada = null;
  try {
    cursada = await Cursada.findOne({ estudiantID, assignaturaID });
  } catch (e) {
    return res.send({ e });
  };
  try {
    await Cursada.findByIdAndDelete(cursada._id);
  } catch (e) { return res.send({ message: e }); }
  return res.send(
    { message: 'Cursada deleted Successfully!' }
  );
};

export default requestMiddleware(deleteCursada, { validation: { body: deleteCursadaSchema } });
