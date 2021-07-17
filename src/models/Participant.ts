import { Model, Schema, model } from 'mongoose';
import TimeStampPlugin, { ITimeStampedDocument } from './plugins/timestamp-plugin';

export interface IParticipant extends ITimeStampedDocument {
  /** FK ID de l'estudiant */
  estudiantID: string;
  /** FK ID del xat */
  xatID: string;
  /** Temps de l'última lectura */
  ultimaLectura: number;
  /** Indicador de notificacions */
  notificacions: string;
  /** Indicador de bloqueig */
  bloqueigGrup: string;
}

interface IParticipantModel extends Model<IParticipant> {}

const schema = new Schema<IParticipant>({
  estudiantID: { type: String, required: true },
  xatID: { type: String, required: true },
  ultimaLectura: { type: Number, required: true },
  notificacions: { type: String, required: true },
  bloqueigGrup: { type: String, required: true }
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);
schema.index({ estudiantID: 1, xatID: 1 }, { unique: true });

const Participant: IParticipantModel = model<IParticipant, IParticipantModel>('Participant', schema);

export default Participant;
