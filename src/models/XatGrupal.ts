import { Model, Schema, model } from 'mongoose';
import TimeStampPlugin from './plugins/timestamp-plugin';
import { IXat, xatGlobal } from './Xat';

export interface IXatGrupal extends IXat {
  /** TItol del XatGrupal */
  titol: string;
  /** Descripcio del XatGrupal */
  descripcio: string;
  /** Imatge del XatGrupal */
  imatge: string;
}

interface IXatGrupalModel extends Model<IXatGrupal> {}

const schema = new Schema<IXatGrupal>({
  titol: { type: String },
  descripcio: { type: String },
  imatge: { type: String }
});

schema.plugin(xatGlobal);
schema.plugin(TimeStampPlugin);

export const xatGrup = function (schem: Schema) {
  schem.add({ titol: { type: String, require: true } });
  schem.add({ descripcio: { type: String } });
  schem.add({ imatge: { type: String } });
};

const xatGrupal: IXatGrupalModel = model<IXatGrupal, IXatGrupalModel>('XatGrupal', schema);

export default xatGrupal;
