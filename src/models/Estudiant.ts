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
  /** FK d'Assignatura */
  LlistaAssignatures: Array<string>;
  /** Llistat de Grups tancats del que es admin*/
  LlistaXatGrupTancat: Array<string>;
}

interface IEstudiantModel extends Model<IEstudiant> { }

const schema = new Schema<IEstudiant>({
  nomComplet: { type: String, index: true, required: true },
  nomSigles: { type: String, index: true, required: true },
  localitzacio: { type: String, required: true }
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const Estudiant: IEstudiantModel = model<IEstudiant, IEstudiantModel>('Estudiant', schema);

export default Estudiant;
