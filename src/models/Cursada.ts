import {
  Model, Schema, model
} from 'mongoose';
import TimeStampPlugin, {
  ITimeStampedDocument
} from './plugins/timestamp-plugin';

export interface ICursada extends ITimeStampedDocument {
      /** FK ID de l'estudiant */
      estudiantID: string;
      /** FK ID de l'assigntura */
      assignaturaID: string;
      /** Situació actual de l'assignatura */
      situacioActual: string;
      /** Comptador de num de vegades cursada */
      numVegades: number;
    }

    interface ICursadaModel extends Model<ICursada> { }

const schema = new Schema<ICursada>({
  estudiantID: { type: String, required: true },
  assignaturaID: { type: String, required: true },
  situacioActual: { type: String, required: true },
  numVegades: { type: Number, required: true }
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);
schema.index({ estudiantID: 1, assignaturaID: 1 }, { unique: true });

const Cursada: ICursadaModel = model<ICursada, ICursadaModel>('Cursada', schema);

export default Cursada;
