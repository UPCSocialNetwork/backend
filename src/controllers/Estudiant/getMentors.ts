/* eslint-disable no-var */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Estudiant from '../../models/Estudiant';

const getMentors: RequestHandler = async (req, res) => {
  var mentors: any[] = [];
  let mentorsResp = null;
  try {
    mentorsResp = await Estudiant.find({ esMentor: { $exists: true, $ne: false } });
  } catch (e) {
    return res.send({ message: e });
  }
  for (let i = 0; i < mentorsResp.length; i++) {
    const elem = mentorsResp[i];
    mentors.push({ nomUsuari: elem.nomUsuari, Grau: elem.grauID, xatMentorID: elem.xatMentorID });
  }
  return res.send({ mentors });
};

export default requestMiddleware(getMentors);
