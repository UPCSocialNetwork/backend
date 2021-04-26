import {
    Model, Schema, model
  } from 'mongoose';
  import TimeStampPlugin, {
    ITimeStampedDocument
  } from './plugins/timestamp-plugin';
  
  export interface ICurs extends ITimeStampedDocument {
    /** Nom del Curs */
    nom: string;
  }
  
  interface ICursModel extends Model<ICurs> { }
  
  const schema = new Schema<ICurs>({
    nom: { type: String, index: true, required: true }
  });
  
  // Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
  schema.plugin(TimeStampPlugin);
  
  const Curs: ICursModel = model<ICurs, ICursModel>('Curs', schema);
  
  export default Curs;