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
  titol: { type: String, required: true },
  descripcio: { type: String, required: true },
  imatge: { type: String, required: true }
});

schema.plugin(xatGlobal);
schema.plugin(TimeStampPlugin);

export const xatGrup = function (schem: Schema) {
  schem.add({ titol: { type: String, required: true } });
  schem.add({ descripcio: { type: String, required: true } });
  schem.add({ imatge: { type: String, required: true } });
};

const xatGrupal: IXatGrupalModel = model<IXatGrupal, IXatGrupalModel>('XatGrupal', schema);

export default xatGrupal;
