import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatGrupTancat, { IXatGrupTancat } from '../../models/XatGrupTancat';

const getOne: RequestHandler = async (req, res) => {
  const { id } = req.params;
  let xatGrupTancat: IXatGrupTancat = null;
  try {
    xatGrupTancat = await XatGrupTancat.findById({ _id: id });
  } catch (error) {
    return res.send({ error });
  };
  if (!xatGrupTancat) return res.send({ message: 'XatGrupTancat not found' });
  return res.send({ xatGrupTancat });
};

export default requestMiddleware(getOne);
