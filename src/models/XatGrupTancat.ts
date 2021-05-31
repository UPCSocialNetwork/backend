import { Model, Schema, model } from 'mongoose';
import TimeStampPlugin from './plugins/timestamp-plugin';
import { IXatGrupal, xatGrup } from './XatGrupal';
import { xatGlobal } from './Xat';

export interface IXatGrupTancat extends IXatGrupal {}
interface IXatGrupTancatModel extends Model<IXatGrupTancat> {}

const schema = new Schema<IXatGrupTancat>({});
schema.plugin(xatGlobal);
schema.plugin(xatGrup);
schema.plugin(TimeStampPlugin);

const XatGrupTancat: IXatGrupTancatModel = model<IXatGrupTancat, IXatGrupTancatModel>('XatGrupTancat', schema);

export default XatGrupTancat;
