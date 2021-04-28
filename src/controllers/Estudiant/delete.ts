/* eslint-disable max-len */
import Joi from '@hapi/joi';
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Estudiant, { IEstudiant } from '../../models/Estudiant';

export const deleteEstudiantSchema = Joi.object().keys({
  nomSigles: Joi.string().required()
});

const deleteCentre: RequestHandler = async (req, res) => {
  const { mail } = req.body;
  let estudiant: IEstudiant = null;
  try {
    estudiant = await Estudiant.findOne({ mail });
  } catch (e) {
    res.send({ e });
  };
  try {
    await Estudiant.findByIdAndDelete(estudiant._id);
  } catch (e) { res.send({ message: e }); }
  res.send(
    { message: 'Estudiant deleted Successfully!' }
  );
};

export default requestMiddleware(deleteCentre, { validation: { body: deleteEstudiantSchema } });
