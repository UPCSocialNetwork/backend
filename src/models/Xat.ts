import { Model, Schema, model } from 'mongoose';
import TimeStampPlugin, { ITimeStampedDocument } from './plugins/timestamp-plugin';

export interface IXat extends ITimeStampedDocument {
  /** Últim missatge del Xat */
  ultimMissatgeID: string;
}

interface IXatModel extends Model<IXat> {}

const schema = new Schema<IXat>({
  ultimMissatgeID: { type: String }
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

export const xatGlobal = function (schem: Schema) {
  schem.add({ ultimMissatgeID: { type: String } });
};

const Xat: IXatModel = model<IXat, IXatModel>('Xat', schema);

export default Xat;
