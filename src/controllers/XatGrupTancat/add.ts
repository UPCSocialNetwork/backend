import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import XatGrupTancat from '../../models/XatGrupTancat';

export const addXatGrupTancatSchema = Joi.object().keys({
  titol: Joi.string(),
  descripcio: Joi.string(),
  imatge: Joi.string(),
  ultimMissatgeID: Joi.string()
});

const add: RequestHandler = async (req, res) => {
  const { titol, descripcio, imatge, ultimMissatgeID } = req.body;
  const xatGrupTancat = new XatGrupTancat({
    titol,
    descripcio,
    imatge,
    ultimMissatgeID
  });
  try {
    await xatGrupTancat.save();
  } catch (e) {
    return res.send({
      message: e
    });
  }

  return res.send({
    message: 'Saved',
    XatGrupTancat: xatGrupTancat.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addXatGrupTancatSchema } });
