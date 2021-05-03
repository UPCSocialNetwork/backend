import {
  Model, Schema, model
} from 'mongoose';
import TimeStampPlugin, {
  ITimeStampedDocument
} from './plugins/timestamp-plugin';

export interface IXat extends ITimeStampedDocument {
    /** Últim missatge del Xat */
    ultimMissatge: string;
  }

  interface IXatModel extends Model<IXat> { }

const schema = new Schema<IXat>({
  ultimMissatge: { type: String, required: true }
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

export const xatGlobal = function (schem: Schema) {
  schem.add({ ultimMissatge: { type: String } });
};

const Xat: IXatModel = model<IXat, IXatModel>('Xat', schema);

export default Xat;
