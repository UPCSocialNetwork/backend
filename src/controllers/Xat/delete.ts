import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Xat from '../../models/Xat';

const deleteXat: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await Xat.findByIdAndDelete({ _id: id });
  } catch (error) { return res.send({ message: error }); }
  return res.send(
    { message: 'Xat deleted Successfully!' }
  );
};

export default requestMiddleware(deleteXat);
