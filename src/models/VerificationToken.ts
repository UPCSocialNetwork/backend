/* eslint-disable keyword-spacing */
import { Model, Schema, model, ObjectId, Document } from 'mongoose';
import * as crypto from 'crypto';
import { IEstudiant } from './Estudiant';

export interface IVerificationToken extends Document {
  /** User reference asociated to the token */
  estudiant: ObjectId;
  /** The token value */
  token: string;
  /** The timestamp where the token was issued */
  createdAt: Date;
  /** Model methods */
  verify(estudiant: ObjectId): void;
}

interface IVerificationTokenModel extends Model<IVerificationToken> {}

const schema = new Schema({
  estudiant: { type: Schema.Types.ObjectId, ref: 'Estudiant' },
  token: { type: String, unique: true },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 3600
  }
});

/* Generates a new random token on instance creation */
schema.pre<IVerificationToken>('save', function (next) {
  this.token = crypto.randomBytes(64).toString('hex');
  next();
});

schema.methods.verify = function (estudiant) {
  const est = <IEstudiant>estudiant;
  est.verified = true;
  est.save();
};

const Estudiant: IVerificationTokenModel = model<IVerificationToken, IVerificationTokenModel>(
  'VerificationToken',
  schema
);

export default Estudiant;
