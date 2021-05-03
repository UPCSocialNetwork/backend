import {
    Model, Schema, model
  } from 'mongoose';
  import TimeStampPlugin, {
    ITimeStampedDocument
  } from './plugins/timestamp-plugin';
  
  export interface IEnquesta extends ITimeStampedDocument {
      /** Títol de l'enquesta */
      titol: string;
      /** Descripció de l'enquesta */
      descripcio: string;
      /** Llista d'opcions de l'enquesta */
      llistaOpcions: string;
      /** FK ID del xat */
      xatID: string;
    }
  
    interface IEnquestaModel extends Model<IEnquesta> { }
  
  const schema = new Schema<IEnquesta>({
    titol: { type: String, required: true },
    descripcio: { type: String, required: true },
    llistaOpcions: { type: String, required: true }, 
    xatID: { type: String, required: true }
  });
  
  // Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
  schema.plugin(TimeStampPlugin);

  const Enquesta: IEnquestaModel = model<IEnquesta, IEnquestaModel>('Enquesta', schema);
  
  export default Enquesta;
  