/* eslint-disable max-len */
import Joi from '@hapi/joi';
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatGrupal from '../../models/XatGrupal';

export const deleteXatGrupalSchema = Joi.object().keys({
  xatGrupalID: Joi.string().required()
});

const deleteXatGrupal: RequestHandler = async (req, res) => {
  const { xatGrupalID } = req.body;
  try {
    await XatGrupal.findByIdAndDelete(xatGrupalID);
  } catch (e) { return res.send({ message: e }); }
  return res.send(
    { message: 'XatGrupal deleted Successfully!' }
  );
};

export default requestMiddleware(deleteXatGrupal, { validation: { body: deleteXatGrupalSchema } });
