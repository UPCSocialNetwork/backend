/* eslint-disable no-lonely-if */
/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-const */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Participant from '../../models/Participant';
import Xat from '../../models/Xat';
import Missatge from '../../models/Missatge';

const getXats: RequestHandler = async (req, res) => {
  const { id } = req.params;
  let xats;
  try {
    xats = await Participant.find({ estudiantID: id });
  } catch (e) {
    return res.send({ e });
  }
  if (!xats) return res.send({ message: 'Participant not found' });
  let nousXats = [];
  try {
    for (let index = 0; index < xats.length; index++) {
      const element = xats[index];
      nousXats.push(await Xat.find({ _id: element.xatID }));
    }
  } catch (e) {
    return res.send({ e });
  }
  if (!nousXats) return res.send({ message: 'NouXat not found' });
  let privats = [];
  try {
    for (let index = 0; index < nousXats.length; index++) {
      const element = nousXats[index][0];
      let count = await Participant.find({ xatID: element._id });
      if (count.length < 3) {
        if (count[0].estudiantID === id) {
          if (element.ultimMissatgeID) {
            privats.push([count[1].estudiantID, element.ultimMissatgeID]);
          }
        } else {
          if (element.ultimMissatgeID) {
            privats.push([count[0].estudiantID, element.ultimMissatgeID]);
          }
        }
      }
    }
  } catch (e) {
    return res.send({ e });
  }
  if (!privats) return res.send({ message: 'Privats not found' });
  let xatsFinals = [];
  try {
    for (let index = 0; index < privats.length; index++) {
      const element = privats[index];
      let missatge = await Missatge.findById({ _id: element[1] });
      xatsFinals.push([element[0], missatge.text, missatge.updatedAt]);
    }
  } catch (e) {
    return res.send({ e });
  }
  if (!xatsFinals) return res.send({ message: 'Xats amb ultim missatge not found' });
  return res.send({ xatsFinals });
};

export default requestMiddleware(getXats);
