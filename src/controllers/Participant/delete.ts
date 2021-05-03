/* eslint-disable max-len */
import Joi from '@hapi/joi';
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Participant, { IParticipant } from '../../models/Participant';

export const deleteParticipantSchema = Joi.object().keys({
    estudiantID: Joi.string().required(),
    xatID: Joi.string().required()
});

const deleteParticipant: RequestHandler = async (req, res) => {
  const { estudiantID, xatID } = req.body;
  let participant: IParticipant = null;
  try {
    participant = await Participant.findOne({ estudiantID, xatID });
  } catch (e) {
    return res.send({ e });
  };
  try {
    await Participant.findByIdAndDelete(participant._id);
  } catch (e) { return res.send({ message: e }); }
  return res.send(
    { message: 'Participant deleted Successfully!' }
  );
};

export default requestMiddleware(deleteParticipant, { validation: { body: deleteParticipantSchema } });
