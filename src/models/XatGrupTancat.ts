import { Model, Schema, model } from 'mongoose';
import TimeStampPlugin from './plugins/timestamp-plugin';
import { IXatGrupal, xatGrup } from './XatGrupal';
import { xatGlobal } from './Xat';

export interface IXatGrupTancat extends IXatGrupal {
  // Boolea que serveix per verificar un grup tancat com a una comunitat oficial
  verified: boolean;
}
interface IXatGrupTancatModel extends Model<IXatGrupTancat> {}

const schema = new Schema<IXatGrupTancat>({
  verified: { type: Boolean, default: false }
});
schema.plugin(xatGlobal);
schema.plugin(xatGrup);
schema.plugin(TimeStampPlugin);

const XatGrupTancat: IXatGrupTancatModel = model<IXatGrupTancat, IXatGrupTancatModel>('XatGrupTancat', schema);

export default XatGrupTancat;
