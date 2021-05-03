import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import XatGrupal from '../../models/XatGrupal';

export const addXatGrupalSchema = Joi.object().keys({
  titol: Joi.string().required(),
  descripcio: Joi.string().required(),
  imatge: Joi.string().required(),
  ultimMissatge: Joi.string().required()
});

const add: RequestHandler = async (req, res) => {
  const {
    titol, descripcio, imatge, ultimMissatge
  } = req.body;
  const xatGrupal = new XatGrupal({
    titol, descripcio, imatge, ultimMissatge
  });
  try {
    await xatGrupal.save();
  } catch (e) {
    return res.send({
      message: e
    });
  };

  return res.send({
    message: 'Saved',
    XatGrupal: xatGrupal.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addXatGrupalSchema } });
