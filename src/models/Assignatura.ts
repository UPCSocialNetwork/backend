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
  /** Obligatòria o optativa */
  tipus: string;
  /** Mail del professor */
  mailProfessor: Array<string>;
  /** FK de Grau */
  grauID: string;
  /** FK XatAssignatura */
  xatAssignaturaID: string;
  /** Llistat d'estudiants que cursen */
  LlistaEstudiants: Array<string>;
}

interface IAssignaturaModel extends Model<IAssignatura> { }

const schema = new Schema<IAssignatura>({
  nomComplet: { type: String, required: true },
  nomSigles: { type: String, required: true },
  quadrimestre: { type: Number, required: true },
  credits: { type: Number, required: true },
  tipus: { type: String, required: true },
  mailProfessor: { type: Array, required: true },
  grauID: { type: String, required: true },
  xatAssignaturaID: { type: String, required: true },
  LlistaEstudiants: { type: Array, required: true }
});



// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);
schema.index({ "nomComplet" : 1, "grauID" : 1 }, { "unique":true });

const Assignatura: IAssignaturaModel = model<IAssignatura, IAssignaturaModel>('Assignatura', schema);

export default Assignatura;
