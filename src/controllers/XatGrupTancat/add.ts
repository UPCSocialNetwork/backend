import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import XatGrupTancat from '../../models/XatGrupTancat';

export const addXatGrupTancatSchema = Joi.object().keys({
  titol: Joi.string().required(),
  descripcio: Joi.string().required(),
  imatge: Joi.string().required(),
  ultimMissatge: Joi.string().required()
});

const add: RequestHandler = async (req, res) => {
  const {
    titol, descripcio, imatge, ultimMissatge
  } = req.body;
  const xatGrupTancat = new XatGrupTancat({
    titol, descripcio, imatge, ultimMissatge
  });
  try {
    await xatGrupTancat.save();
  } catch (e) {
    return res.send({
      message: e
    });
  };

  return res.send({
    message: 'Saved',
    XatGrupTancat: xatGrupTancat.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addXatGrupTancatSchema } });