/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable arrow-parens */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Xat, { IXat } from '../../models/Xat';
import Participant, { IParticipant } from '../../models/Participant';

const getXatParts: RequestHandler = async (req, res) => {
  const { nom1, nom2 } = req.params;
  let xats: string[] = [];
  let xatFinal = null;
  try {
    let parts1 = await Participant.find({ estudiantID: nom1 });
    let parts2 = await Participant.find({ estudiantID: nom2 });
    parts1.forEach((p1) => {
      parts2.forEach((p2) => {
        if (p1.xatID === p2.xatID) xats.push(p1.xatID);
      });
    });
    if (xats.length > 0) {
      let responseXat;
      let found = false;
      let i = 0;
      while (!found && i < xats.length) {
        responseXat = await Xat.find({ _id: xats[i] });
        if (responseXat.length > 0) {
          found = true;
        }
        i++;
      }
      xatFinal = responseXat;
    }
  } catch (error) {
    return res.send({ error });
  }
  if (xatFinal.length > 0) return res.send(xatFinal);
  else return res.send(false);
};

export default requestMiddleware(getXatParts);
