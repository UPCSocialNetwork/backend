/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable no-lonely-if */
/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-const */
import { RequestHandler, response } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Participant from '../../models/Participant';
import Xat from '../../models/Xat';
import Missatge from '../../models/Missatge';
import Estudiant from '../../models/Estudiant';

const getXats: RequestHandler = async (req, res) => {
  const { id } = req.params;
  let xats;
  try {
    xats = await Participant.find({ estudiantID: id });
  } catch (e) {
    return res.send({ e });
  }
  if (!xats) return res.send({ message: 'Participant not found' });
  // xats: todos los participantes
  let nousXats: any[][] = [];
  try {
    for (let index = 0; index < xats.length; index++) {
      const element = xats[index];
      await Xat.find({ _id: element.xatID })
        .then((response) => {
          if (response.length > 0) {
            nousXats.push(response);
          }
        })
        .catch((e) => {});
    }
  } catch (e) {
    return res.send({ e });
  }
  if (!nousXats) return res.send({ message: 'NouXat not found' });
  // nousXats: todos los xats privados
  let privats = [];
  try {
    for (let index = 0; index < nousXats.length; index++) {
      const element = nousXats[index][0];
      let count = await Participant.find({ xatID: element._id });
      if (count[0].estudiantID === id) {
        if (element.ultimMissatgeID) {
          privats.push([count[1].xatID, count[0]._id, count[1].estudiantID, element.ultimMissatgeID]);
        }
      } else {
        if (element.ultimMissatgeID) {
          privats.push([count[0].xatID, count[1]._id, count[0].estudiantID, element.ultimMissatgeID]);
        }
      }
    }
  } catch (e) {
    return res.send({ e });
  }
  if (!privats) return res.send({ message: 'Privats not found' });
  let xatsFinals: any[][] = [];
  try {
    for (let index = 0; index < privats.length; index++) {
      const element = privats[index];
      await Missatge.findById({ _id: element[3] })
        .then(async (response) => {
          await Participant.findById({ _id: response.participantID })
            .then(async (resp) => {
              await Participant.findOne({ estudiantID: id, xatID: element[0] })
                .then((resp2) => {
                  // eslint-disable-next-line max-len
                  xatsFinals.push([
                    element[0],
                    element[1],
                    element[2],
                    response.text,
                    response.updatedAt,
                    resp.estudiantID,
                    'privs',
                    resp2.ultimaLectura
                  ]);
                })
                .catch((e) => {
                  console.error(e);
                });
            })
            .catch((e) => {});
        })
        .catch((e) => {});
    }
  } catch (e) {
    return res.send({ e });
  }
  if (!xatsFinals) return res.send({ message: 'Xats amb ultim missatge not found' });
  return res.send({ xatsFinals });
};

export default requestMiddleware(getXats);
