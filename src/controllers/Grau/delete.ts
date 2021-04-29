/* eslint-disable max-len */
import Joi from '@hapi/joi';
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Grau, { IGrau } from '../../models/Grau';

export const deleteGrauSchema = Joi.object().keys({
  nom: Joi.string().required()
});

const deleteGrau: RequestHandler = async (req, res) => {
  const { nom } = req.body;
  let grau: IGrau = null;
  try {
    grau = await Grau.findOne({ nom });
  } catch (e) {
    res.send({ e });
  };
  try {
    await Grau.findByIdAndDelete(grau._id);
  } catch (e) { res.send({ message: e }); }
  res.send(
    { message: 'Grau deleted Successfully!' }
  );
};

export default requestMiddleware(deleteGrau, { validation: { body: deleteGrauSchema } });
