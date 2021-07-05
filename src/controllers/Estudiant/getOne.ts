import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Estudiant, { IEstudiant } from '../../models/Estudiant';

const getOne: RequestHandler = async (req, res) => {
  const { id } = req.params;
  let estudiant: IEstudiant = null;
  try {
    estudiant = await Estudiant.findOne({ nomUsuari: id });
  } catch (e) {
    return res.send({ e });
  }
  if (!estudiant) return res.send({ message: 'Estudiant not found' });
  return res.send({ estudiant });
};

export default requestMiddleware(getOne);
