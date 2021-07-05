import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatGrupTancat from '../../models/XatGrupTancat';

const deleteXatGrupTancat: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await XatGrupTancat.findByIdAndDelete({ _id: id });
  } catch (error) { return res.send({ message: error }); }
  return res.send(
    { message: 'XatGrupTancat deleted Successfully!' }
  );
};

export default requestMiddleware(deleteXatGrupTancat);
