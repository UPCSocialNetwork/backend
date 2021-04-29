import {
    Model, Schema, model
  } from 'mongoose';
  import TimeStampPlugin, {
    ITimeStampedDocument
  } from './plugins/timestamp-plugin';
  
  export interface IGrau extends ITimeStampedDocument {
    /** Nom del Grau */
    nom: string;
    /** Crèdits Grau */
    credits: number;
    /** FK de centre universitari */
    centreUniversitariID: string; 
  }
  
  interface IGrauModel extends Model<IGrau> { }
  
  const schema = new Schema<IGrau>({
    nom: { type: String, index: true, required: true },
    credits: { type: Number, required: true },
    centreUniversitariID: {type: String, required:true}
  });
  
  // Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
  schema.plugin(TimeStampPlugin);
  
  const Grau: IGrauModel = model<IGrau, IGrauModel>('Grau', schema);
  
  export default Grau;