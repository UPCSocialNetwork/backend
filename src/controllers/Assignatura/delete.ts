/* eslint-disable max-len */
import Joi from '@hapi/joi';
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Assignatura, { IAssignatura } from '../../models/Assignatura';

export const deleteAssignaturaSchema = Joi.object().keys({
  nomSigles: Joi.string().required()
});

const deleteCentre: RequestHandler = async (req, res) => {
  const { nomSigles } = req.body;
  let assignatura: IAssignatura = null;
  try {
    assignatura = await Assignatura.findOne({ nomSigles });
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

export default requestMiddleware(deleteCentre, { validation: { body: deleteAssignaturaSchema } });
