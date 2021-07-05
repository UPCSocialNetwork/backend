import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatGrupal, { IXatGrupal } from '../../models/XatGrupal';

const getOne: RequestHandler = async (req, res) => {
  const { id } = req.params;
  let xatGrupal: IXatGrupal = null;
  try {
    xatGrupal = await XatGrupal.findById({ _id: id });
  } catch (error) {
    return res.send({ error });
  };
  if (!xatGrupal) return res.send({ message: 'XatGrupal not found' });
  return res.send({ xatGrupal });
};

export default requestMiddleware(getOne);
