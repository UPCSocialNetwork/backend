import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Cursada from '../../models/Cursada';

export const addCursadaSchema = Joi.object().keys({
  estudiantID: Joi.string().required(),
  assignaturaID: Joi.string().required(),
  situacioActual: Joi.string().required(),
  numVegades: Joi.number().required()
});

const add: RequestHandler = async (req, res) => {
  const { estudiantID, assignaturaID, situacioActual, numVegades } = req.body;

  const cursada = new Cursada({ estudiantID, assignaturaID, situacioActual, numVegades });
  try {
    await cursada.save();
  } catch (e) {
    return res.send({
      message: e
    });
  };

  return res.send({
    message: 'Saved',
    Grau: cursada.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addCursadaSchema } });