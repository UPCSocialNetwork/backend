import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatGrupTancat from '../../models/XatGrupTancat';

const all: RequestHandler = async (req, res) => {
  let xatGrupTancat = null;
  try {
    xatGrupTancat = await XatGrupTancat.find();
  } catch (e) {
    return res.send({ message: e });
  };
  return res.send({ xatGrupTancat });
};

export default requestMiddleware(all);
