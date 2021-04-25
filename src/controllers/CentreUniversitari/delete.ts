/* eslint-disable max-len */
import Joi from '@hapi/joi';
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import CentreUniversitari, { ICentreUniversitari } from '../../models/CentreUniversitari';

export const deleteCentreUniversitariSchema = Joi.object().keys({
  nomSigles: Joi.string().required()
});

const deleteCentre: RequestHandler = async (req, res) => {
  const { nomSigles } = req.body;
  let centreUniversitari: ICentreUniversitari = null;
  try {
    centreUniversitari = await CentreUniversitari.findOne({ nomSigles });
  } catch (e) {
    res.send({ e });
  };
  try {
    await CentreUniversitari.findByIdAndDelete(centreUniversitari._id);
  } catch (e) { res.send({ message: e }); }
  res.send(
    { message: 'CentreUniversitari deleted Successfully!' }
  );
};

export default requestMiddleware(deleteCentre, { validation: { body: deleteCentreUniversitariSchema } });
