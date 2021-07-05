/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { RequestHandler } from 'express';
import { ObjectId } from 'mongoose';
import requestMiddleware from '../../middleware/request-middleware';
import VerificationToken, { IVerificationToken } from '../../models/VerificationToken';

const verify: RequestHandler = async (req, res) => {
  // const vtoken: IVerificationToken = await VerificationToken.findOne({ token: req.params.token });
  const vt: IVerificationToken = await VerificationToken.findOneAndDelete({ token: req.params.token }).populate(
    'estudiant'
  );
  if (!vt) return res.status(400).send();
  vt.verify(vt.estudiant);
  return res.send({
    message: 'Saved',
    token: vt.toJSON()
  });
};

export default requestMiddleware(verify);
