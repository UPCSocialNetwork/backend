import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Participant from '../../models/Participant';

const all: RequestHandler = async (req, res) => {
  let participant = null;
  try {
    participant = await Participant.find();
  } catch (e) {
    return res.send({ message: e });
  };
  return res.send({ participant });
};

export default requestMiddleware(all);
