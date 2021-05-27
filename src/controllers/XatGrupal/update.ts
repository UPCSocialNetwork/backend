/* eslint-disable max-len */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatGrupal, { IXatGrupal } from '../../models/XatGrupal';

const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

export const updateXatGrupalSchema = Joi.object().keys({
  titol: Joi.string().required(),
  descripcio: Joi.string().required(),
  imatge: Joi.string().required(),
  ultimMissatgeID: Joi.string().required()
});

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { titol, descripcio, imatge, ultimMissatgeID } = req.body;
  let xatGrupal: IXatGrupal = null;
  try {
    xatGrupal = await XatGrupal.findById({ _id: id });
    xatGrupal.titol = titol;
    xatGrupal.descripcio = descripcio;
    xatGrupal.imatge = imatge;
    xatGrupal.ultimMissatgeID = ultimMissatgeID;
    await xatGrupal.save();
  } catch (e) {
    return res.send({ message: e });
  }
  if (!xatGrupal) return res.send({ message: 'XatGrupal not found' });
  return res.send({
    message: 'Updated XatGrupal',
    XatGrupal: xatGrupal.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: updateXatGrupalSchema } });
