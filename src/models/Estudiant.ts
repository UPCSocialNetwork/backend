/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { Model, Schema, model, NativeError } from 'mongoose';
import TimeStampPlugin, { ITimeStampedDocument } from './plugins/timestamp-plugin';

const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const SALT_WORK_FACTOR = 10;
export interface IEstudiant extends ITimeStampedDocument {
  /** Nom de l'Estudiant */
  nomUsuari: string;
  /** Mail de l'Estudiant */
  mail: string;
  /** Constrasenya l'Estudiant */
  contrasenya: string;
  /** Descripcio de l'Estudiant */
  descripcio: string;
  /** Identificador del centre de l'Estudiant */
  centreID: string;
  /** Identificador del grau de l'Estudiant */
  grauID: string;
  /** Boolean de si es mentor o no */
  esMentor: boolean;
  /** Llistat d'interessos de l'Estudiant */
  interessos: Array<string>;
  /** Identificador del xat mentor de l'Estudiant */
  xatMentorID: string;
  /** FK d'Assignatura */
  LlistaAssignatures: Array<string>;
  /** Llistat de Grups tancats del que es admin*/
  LlistaXatGrupTancat: Array<string>;
  /** Booleà que identifica si un usuari s'ha verificat a la app */
  verified: boolean;

  /**  Metodes Model */
  comparePassword(password: string): boolean;
  issueJsonWebToken(): string;
}

interface IEstudiantModel extends Model<IEstudiant> {}

const schema = new Schema<IEstudiant>({
  nomUsuari: { type: String, unique: true, required: true },
  mail: { type: String, unique: true, required: true },
  contrasenya: { type: String, required: true },
  descripcio: { type: String, required: true },
  centreID: { type: String, required: true },
  grauID: { type: String, required: true },
  esMentor: { type: Boolean, required: true },
  interessos: { type: Array },
  xatMentorID: { type: String, required: true },
  LlistaAssignatures: { type: Array, required: true },
  LlistaXatGrupTancat: { type: Array, required: true },
  verified: { type: Boolean, default: false }
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);
schema.plugin(uniqueValidator);

/* Hashes password when it's saved for the first time */
schema.pre<IEstudiant>('save', function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('contrasenya')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err: NativeError, salt: any) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(this.contrasenya, salt, (err2: NativeError, hash: string) => {
      if (err2) return next(err2);
      // override the cleartext password with the hashed one
      this.contrasenya = hash;
      next();
    });
  });
});

/* Compares a given password with the hashed password in database */
schema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.contrasenya);
};

/** Returns a new JWT for the user instance */
schema.methods.issueJsonWebToken = function (): string {
  return jwt.sign(this.nomUsuari, process.env.TOKEN_SECRET, { algorithm: 'HS256' });
};

/** Exclude password field from being included in JSON responses */
schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.contrasenya;
  return obj;
};

const Estudiant: IEstudiantModel = model<IEstudiant, IEstudiantModel>('Estudiant', schema);

export default Estudiant;
