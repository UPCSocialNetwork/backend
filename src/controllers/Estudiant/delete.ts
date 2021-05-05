import Joi from '@hapi/joi';
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Estudiant, { IEstudiant } from '../../models/Estudiant';

export const deleteEstudiantSchema = Joi.object().keys({
  mail: Joi.string().required()
});

const deleteCentre: RequestHandler = async (req, res) => {
  const { mail } = req.body;
  let estudiant: IEstudiant = null;
  try {
    estudiant = await Estudiant.findOne({ mail });
  } catch (e) {
    return res.send({ e });
  };
  try {
    await Estudiant.findByIdAndDelete(estudiant._id);
  } catch (e) { return res.send({ message: e }); }
  return res.send(
    { message: 'Estudiant deleted Successfully!' }
  );
};

export default requestMiddleware(deleteCentre, { validation: { body: deleteEstudiantSchema } });
