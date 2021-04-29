import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import CentreUniversitari from '../../models/CentreUniversitari';

export const addCentreUniversitariSchema = Joi.object().keys({
  nomComplet: Joi.string().required(),
  nomSigles: Joi.string().required(),
  localitzacio: Joi.string().required()
});

const add: RequestHandler = async (req, res) => {
  const { nomComplet, nomSigles, localitzacio } = req.body;

  const centreUniversitari = new CentreUniversitari({ nomComplet, nomSigles, localitzacio });
  try {
    await centreUniversitari.save();
  } catch (e) {
    return res.send({
      message: e
    });
  };

  return res.send({
    message: 'Saved',
    CentreUniversitari: centreUniversitari.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addCentreUniversitariSchema } });
