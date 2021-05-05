import { Model, Schema, model } from 'mongoose';
import TimeStampPlugin, { ITimeStampedDocument } from './plugins/timestamp-plugin';

export interface IAssignatura extends ITimeStampedDocument {
  /** Nom de l'Assignatura */
  nomComplet: string;
  /** Sigles de l'Assignatura */
  nomSigles: string;
  /** Constrasenya l'Assignatura */
  quadrimestre: number;
  /** Descripcio de l'Assignatura */
  credits: number;
  /** FK de Grau */
  grauID: string;
  /** FK XatAssignatura */
  xatAssignaturaID: string;
  /** Llistat d'estudiants que cursen */
  LlistaEstudiants: Array<string>;
}

interface IAssignaturaModel extends Model<IAssignatura> { }

const schema = new Schema<IAssignatura>({
  nomComplet: { type: String, unique: true, required: true },
  nomSigles: { type: String, index: true, unique: true, required: true },
  quadrimestre: { type: Number, required: true },
  credits: { type: Number, required: true },
  grauID: { type: String, required: true },
  xatAssignaturaID: { type: String, required: true },
  LlistaEstudiants: { type: Array, required: true }
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const Assignatura: IAssignaturaModel = model<IAssignatura, IAssignaturaModel>('Assignatura', schema);

export default Assignatura;
