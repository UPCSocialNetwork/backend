import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Xat from '../../models/Xat';

export const addXatSchema = Joi.object().keys({
  ultimMissatgeID: Joi.string()
});

const add: RequestHandler = async (req, res) => {
  const { ultimMissatgeID } = req.body;

  const xat = new Xat({ ultimMissatgeID });
  try {
    await xat.save();
  } catch (e) {
    return res.send({
      message: e
    });
  }

  return res.send({
    message: 'Saved',
    Xat: xat.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addXatSchema } });
