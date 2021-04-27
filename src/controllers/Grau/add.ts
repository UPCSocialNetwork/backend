import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Grau from '../../models/Grau';

export const addGrauSchema = Joi.object().keys({
  nom: Joi.string().required(),
  credits: Joi.number().required(),
  centreUniversitariID: Joi.string().required()
});

const add: RequestHandler = async (req, res) => {
  const { nom, credits, centreUniversitariID } = req.body;

  const grau = new Grau({ nom, credits, centreUniversitariID });
  try {
    await grau.save();
  } catch (e) {
    res.send({
      message: e
    });
  };

  res.send({
    message: 'Saved',
    Grau: grau.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addGrauSchema } });
