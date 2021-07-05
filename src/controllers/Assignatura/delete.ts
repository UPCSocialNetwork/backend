/* eslint-disable max-len */
import Joi from '@hapi/joi';
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Assignatura, { IAssignatura } from '../../models/Assignatura';

export const deleteAssignaturaSchema = Joi.object().keys({
  nomComplet: Joi.string().required(),
  grauID: Joi.string().required()
});

const deleteAssignatura: RequestHandler = async (req, res) => {
  const { nomComplet, grauID } = req.body;
  let assignatura: IAssignatura = null;
  try {
    assignatura = await Assignatura.findOne({ nomComplet, grauID });
  } catch (e) {
    return res.send({ e });
  };
  try {
    await Assignatura.findByIdAndDelete(assignatura._id);
  } catch (e) { return res.send({ message: e }); }
  return res.send(
    { message: 'Assignatura deleted Successfully!' }
  );
};

export default requestMiddleware(deleteAssignatura, { validation: { body: deleteAssignaturaSchema } });
