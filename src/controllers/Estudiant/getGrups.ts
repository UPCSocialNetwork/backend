/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable no-console */
/* eslint-disable space-before-blocks */
/* eslint-disable no-lonely-if */
/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-const */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Participant from '../../models/Participant';
import Missatge from '../../models/Missatge';
import XatGrupTancat from '../../models/XatGrupTancat';
import XatAssignatura from '../../models/XatAssignatura';
import XatMentor from '../../models/XatMentor';

const getGrups: RequestHandler = async (req, res) => {
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
      let tancats = await XatGrupTancat.find({ _id: element.xatID });
      let assigs = await XatAssignatura.find({ _id: element.xatID });
      let mentors = await XatMentor.find({ _id: element.xatID });
      if (tancats.length > 0) nousXats.push(tancats);
      if (assigs.length > 0) nousXats.push(assigs);
      if (mentors.length > 0) nousXats.push(mentors);
    }
  } catch (e) {
    return res.send({ e });
  }
  if (!nousXats) return res.send({ message: 'NouXat not found' });
  let grups = [];
  for (let index = 0; index < nousXats.length; index++) {
    const element = nousXats[index][0];
    grups.push([element._id, element.titol, element.ultimMissatgeID]);
  }
  if (!grups) return res.send({ message: 'Grups not found' });
  let xatsFinals: (string | number)[][] = [];
  try {
    for (let index = 0; index < grups.length; index++) {
      const element = grups[index];
      await Missatge.findById({ _id: element[2] })
        .then(async (response) => {
          await Participant.findById({ _id: response.participantID })
            .then((resp) => {
              xatsFinals.push([element[0], element[1], response.text, response.updatedAt, resp.estudiantID]);
            })
            .catch((e) => {});
        })
        .catch(() => {
          xatsFinals.push([element[0], element[1], 'Cap missatge', 404, '']);
        });
    }
  } catch (e) {
    return res.send({ e });
  }
  if (!xatsFinals) return res.send({ message: 'Xats amb ultim missatge not found' });
  return res.send({ xatsFinals });
};

export default requestMiddleware(getGrups);
