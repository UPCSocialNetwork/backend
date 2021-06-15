import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Estudiant, { IEstudiant } from '../../models/Estudiant';

export const signinEstudiantSchema = Joi.object().keys({
  nomUsuari: Joi.string().required(),
  contrasenya: Joi.string().required()
});

const signin: RequestHandler = async (req, res) => {
  const { nomUsuari, contrasenya } = req.body;
  const estudiant: IEstudiant = await Estudiant.findOne({ nomUsuari });

  if (!estudiant) return res.status(400).send();
  const isMatch = estudiant.comparePassword(contrasenya);
  if (!isMatch) return res.status(400).send();

  return res.send({
    message: 'Success',
    jwt: estudiant.issueJsonWebToken()
  });
};

export default requestMiddleware(signin, { validation: { body: signinEstudiantSchema } });
