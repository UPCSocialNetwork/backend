import Joi from '@hapi/joi';
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Estudiant, { IEstudiant } from '../../models/Estudiant';

const deleteCentre: RequestHandler = async (req, res) => {
  const { id } = req.params;
  let estudiant: IEstudiant = null;
  try {
    estudiant = await Estudiant.findOne({ nomUsuari: id });
  } catch (e) {
    return res.send({ e });
  }
  try {
    await Estudiant.findByIdAndDelete(estudiant._id);
  } catch (e) {
    return res.send({ message: e });
  }
  return res.send({ message: 'Estudiant deleted Successfully!' });
};

export default requestMiddleware(deleteCentre);
