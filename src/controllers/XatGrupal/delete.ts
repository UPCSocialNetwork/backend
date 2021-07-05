import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatGrupal from '../../models/XatGrupal';

const deleteXatGrupal: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await XatGrupal.findByIdAndDelete({ _id: id });
  } catch (error) { return res.send({ message: error }); }
  return res.send(
    { message: 'XatGrupal deleted Successfully!' }
  );
};

export default requestMiddleware(deleteXatGrupal);
