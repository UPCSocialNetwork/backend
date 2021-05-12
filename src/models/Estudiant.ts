import {
  Model, Schema, model
} from 'mongoose';
import TimeStampPlugin, {
  ITimeStampedDocument
} from './plugins/timestamp-plugin';

export interface IEstudiant extends ITimeStampedDocument {
  /** Nom de l'Estudiant */
  nomComplet: string;
  /** Mail de l'Estudiant */
  mail: string;
  /** Constrasenya l'Estudiant */
  contrasenya: string;
  /** Descripcio de l'Estudiant */
  descripcio: string;
  /** Identificador del mentor de l'Estudiant */
  mentorID: string;
  /** Llistat d'interessos de l'Estudiant */
  interessos: Array<string>
  /** FK d'Assignatura */
  LlistaAssignatures: Array<string>;
  /** Llistat de Grups tancats del que es admin*/
  LlistaXatGrupTancat: Array<string>;
}

interface IEstudiantModel extends Model<IEstudiant> { }

const schema = new Schema<IEstudiant>({
  nomComplet: { type: String, required: true },
  mail: { type: String, unique: true, required: true },
  contrasenya: { type: String, required: true },
  descripcio: { type: String, required: true },
  mentorID: { type: String, required: true },
  interessos: { type: Array },
  LlistaAssignatures: { type: Array, required: true },
  LlistaXatGrupTancat: { type: Array, required: true }

});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const Estudiant: IEstudiantModel = model<IEstudiant, IEstudiantModel>('Estudiant', schema);

export default Estudiant;
