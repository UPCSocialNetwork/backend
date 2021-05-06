import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Xat, { IXat } from '../../models/Xat';

const getOne: RequestHandler = async (req, res) => {
  const { id } = req.params;
  let xat: IXat = null;
  try {
    xat = await Xat.findById({ _id: id });
  } catch (error) {
    return res.send({ error });
  };
  if (!xat) return res.send({ message: 'Xat not found' });
  return res.send({ xat });
};

export default requestMiddleware(getOne);
