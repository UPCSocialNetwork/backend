import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatMentor, { IXatMentor } from '../../models/XatMentor';

const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

export const updateXatMentorSchema = Joi.object().keys({
  mentorID: Joi.string().required(),
  titol: Joi.string().required(),
  descripcio: Joi.string().required(),
  imatge: Joi.string().required(),
  ultimMissatge: Joi.string().required()
});

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const {
    mentorID, titol, descripcio, imatge, ultimMissatge
  } = req.body;
  let xatMentor: IXatMentor = null;
  try {
    xatMentor = await XatMentor.findById({ _id: id });
    xatMentor.mentorID = mentorID;
    xatMentor.titol = titol;
    xatMentor.descripcio = descripcio;
    xatMentor.imatge = imatge;
    xatMentor.ultimMissatge = ultimMissatge;
    await xatMentor.save();
  } catch (e) { return res.send({ message: e }); };
  if (!xatMentor) return res.send({ message: 'XatMentor not found' });
  return res.send({
    message: 'Updated XatMentor',
    XatMentor: xatMentor.toJSON()
  });
};

export default requestMiddleware(update, { validation: { body: updateXatMentorSchema } });
