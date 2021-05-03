import {
    Model, Schema, model
  } from 'mongoose';
  import TimeStampPlugin, {
    ITimeStampedDocument
  } from './plugins/timestamp-plugin';
  
  export interface IMissatge extends ITimeStampedDocument {
      /** FK ID de l'estudiant */
      estudiantID: string;
      /** FK ID del xat */
      xatID: string;
      /** Text del missatge */
      text: string;
    }
  
    interface IMissatgeModel extends Model<IMissatge> { }
  
  const schema = new Schema<IMissatge>({
    estudiantID: { type: String, required: true },
    xatID: { type: String, required: true },
    text: { type: String, required: true }
  });
  
  // Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
  schema.plugin(TimeStampPlugin);
  schema.index({ "estudiantID" : 1, "xatID" : 1 }, { "unique":true });

  const Missatge: IMissatgeModel = model<IMissatge, IMissatgeModel>('Missatge', schema);
  
  export default Missatge;
  