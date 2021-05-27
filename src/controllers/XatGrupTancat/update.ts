/* eslint-disable max-len */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatGrupTancat, { IXatGrupTancat } from '../../models/XatGrupTancat';

const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

export const updateXatGrupTancatSchema = Joi.object().keys({
  titol: Joi.string().required(),
  descripcio: Joi.string().required(),
  imatge: Joi.string().required(),
  ultimMissatgeID: Joi.string().required()
});

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { titol, descripcio, imatge, ultimMissatgeID } = req.body;
  let xatGrupTancat: IXatGrupTancat = null;
  try {
    xatGrupTancat = await XatGrupTancat.findById({ _id: id });
    xatGrupTancat.titol = titol;
    xatGrupTancat.descripcio = descripcio;
    xatGrupTancat.imatge = imatge;
    xatGrupTancat.ultimMissatgeID = ultimMissatgeID;
    await xatGrupTancat.save();
  } catch (e) {
    return res.send({ message: e });
  }
  if (!xatGrupTancat) return res.send({ message: 'XatGrupTancat not found' });
  return res.send({
    message: 'Updated XatGrupTancat',
    XatGrupTancat: xatGrupTancat.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: updateXatGrupTancatSchema } });
