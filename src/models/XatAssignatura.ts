import { Model, Schema, model } from 'mongoose';
import TimeStampPlugin from './plugins/timestamp-plugin';
import { IXatGrupal, xatGrup } from './XatGrupal';
import { xatGlobal } from './Xat';

export interface IXatAssignatura extends IXatGrupal {
  /** FK d'Assignatura */
  assignaturaID: string;
  /** FK Grau */
  grauID: string;
  /** Informacio guia docent assignatura */
  guiaDocent: string;
  /** Mail del professor de l'Assignatura */
  mailProfessor: Array<string>;
  /** FK de Estudiant */
  delegatID: string;
}

interface IXatAssignaturaModel extends Model<IXatAssignatura> {}

const schema = new Schema<IXatAssignatura>({
  assignaturaID: { type: String, required: true },
  grauID: { type: String, required: true },
  guiaDocent: { type: String },
  mailProfessor: { type: Array, required: true },
  delegatID: { type: String, required: true }
});

schema.plugin(xatGlobal);
schema.plugin(xatGrup);
schema.plugin(TimeStampPlugin);
schema.index({ assignaturaID: 1, grauID: 1 }, { unique: true });

const XatAssignatura: IXatAssignaturaModel = model<IXatAssignatura, IXatAssignaturaModel>('XatAssignatura', schema);

export default XatAssignatura;
