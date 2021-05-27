import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import XatMentor from '../../models/XatMentor';

export const addXatMentorSchema = Joi.object().keys({
  mentorID: Joi.string().required(),
  titol: Joi.string().required(),
  descripcio: Joi.string().required(),
  imatge: Joi.string().required(),
  ultimMissatgeID: Joi.string().required()
});

const add: RequestHandler = async (req, res) => {
  const { mentorID, titol, descripcio, imatge, ultimMissatgeID } = req.body;
  const xatMentor = new XatMentor({
    mentorID,
    titol,
    descripcio,
    imatge,
    ultimMissatgeID
  });
  try {
    await xatMentor.save();
  } catch (e) {
    return res.send({
      message: e
    });
  }

  return res.send({
    message: 'Saved',
    XatMentor: xatMentor.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addXatMentorSchema } });
