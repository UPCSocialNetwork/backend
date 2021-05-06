import {
  Model, Schema, model
} from 'mongoose';
import TimeStampPlugin from './plugins/timestamp-plugin';
import { IXatGrupal, xatGrup } from './XatGrupal';

export interface IXatMentor extends IXatGrupal {
    /** FK de Estudiant mentor */
    mentorID: string;
  }
  interface IXatMentorModel extends Model<IXatMentor> { }

const schema = new Schema<IXatMentor>({
  mentorID: { type: String, required: true }
});

schema.plugin(xatGrup);
schema.plugin(TimeStampPlugin);
const XatMentor: IXatMentorModel = model<IXatMentor, IXatMentorModel>('XatMentor', schema);

export default XatMentor;
