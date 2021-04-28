import {
  Model, Schema, model
} from 'mongoose';
import TimeStampPlugin, {
  ITimeStampedDocument
} from './plugins/timestamp-plugin';

export interface ICentreUniversitari extends ITimeStampedDocument {
  /** Nom del CentreUniversitari */
  nomComplet: string;
  /** Sigles CentreUniversitari */
  nomSigles: string;
  /** Localització del CentreUniversitari */
  localitzacio: string;
}

interface ICentreUniversitariModel extends Model<ICentreUniversitari> { }

const schema = new Schema<ICentreUniversitari>({
  nomComplet: { type: String, required: true },
  nomSigles: { type: String, index: true, required: true },
  localitzacio: { type: String, required: true }
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const CentreUniversitari: ICentreUniversitariModel = model<ICentreUniversitari, ICentreUniversitariModel>('CentreUniversitari', schema);

export default CentreUniversitari;
