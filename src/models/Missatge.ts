import {
    Model, Schema, model
  } from 'mongoose';
  import TimeStampPlugin, {
    ITimeStampedDocument
  } from './plugins/timestamp-plugin';
  
  export interface IMissatge extends ITimeStampedDocument {
    /** Text del missatge */
    text: string;
    /** FK ID del participant */
    participantID: string;
    }
  
    interface IMissatgeModel extends Model<IMissatge> { }
  
  const schema = new Schema<IMissatge>({
    text: { type: String, required: true },
    participantID: { type: String, required: true }
  });
  
  // Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
  schema.plugin(TimeStampPlugin);

  const Missatge: IMissatgeModel = model<IMissatge, IMissatgeModel>('Missatge', schema);
  
  export default Missatge;
  