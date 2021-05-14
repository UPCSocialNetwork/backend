import {
  Model, Schema, model
} from 'mongoose';
import TimeStampPlugin from './plugins/timestamp-plugin';
import { IXatGrupal, xatGrup } from './XatGrupal';

export interface IXatAssignatura extends IXatGrupal {
    /** FK d'Assignatura */
    assignaturaID: string;
    /** Informacio guia docent assignatura */
    guiaDocent: string;
    /** Mail del professor de l'Assignatura */
    mailProfessor: Array<string>;
    /** FK de Estudiant */
    delegatID: string;
  }

  interface IXatAssignaturaModel extends Model<IXatAssignatura> { }

const schema = new Schema<IXatAssignatura>({
  assignaturaID: { type: String, required: true },
  guiaDocent: { type: String },
  mailProfessor: { type: Array, required: true },
  delegatID: { type: String, required: true }
});

schema.plugin(xatGrup);
schema.plugin(TimeStampPlugin);
const XatAssignatura: IXatAssignaturaModel = model<IXatAssignatura, IXatAssignaturaModel>('XatAssignatura', schema);

export default XatAssignatura;
