import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Estudiant, { IEstudiant } from '../../models/Estudiant';
import Participant, { IParticipant } from '../../models/Participant';
import Xat, { IXat } from '../../models/Xat';

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
        if (count[0].estudiantID == id) {
          privats.push([count[1].estudiantID, element.ultimMissatge]);
        } else {
          privats.push([count[0].estudiantID, element.ultimMissatge]);
        }
      }
    }
  } catch (e) {
    return res.send({ e });
  }
  if (!privats) return res.send({ message: 'Privats not found' });
  return res.send({ privats });
};

export default requestMiddleware(getXats);
