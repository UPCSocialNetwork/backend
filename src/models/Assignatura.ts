import { Model, Schema, model } from 'mongoose';
import TimeStampPlugin, { ITimeStampedDocument } from './plugins/timestamp-plugin';

export interface IAssignatura extends ITimeStampedDocument {
  /** Nom de l'Assignatura */
  nomComplet: string;
  /** Mail de l'Assignatura */
  nomSigles: string;
  /** Constrasenya l'Assignatura */
  quadrimestre: string;
  /** Descripcio de l'Assignatura */
  credits: string;
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
  nomSigles: {
    type: String, index: true, unique: true, required: true
  },
  quadrimestre: { type: String, required: true },
  credits: { type: String, required: true },
  grauID: { type: String, required: true },
  xatAssignaturaID: { type: String, required: true },
  LlistaEstudiants: { type: Array, required: true }
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const Assignatura: IAssignaturaModel = model<IAssignatura, IAssignaturaModel>('Assignatura', schema);

export default Assignatura;
