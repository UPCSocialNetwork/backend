import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatGrupal from '../../models/XatGrupal';

const all: RequestHandler = async (req, res) => {
  let xatGrupal = null;
  try {
    xatGrupal = await XatGrupal.find();
  } catch (e) {
    return res.send({ message: e });
  };
  return res.send({ xatGrupal });
};

export default requestMiddleware(all);
