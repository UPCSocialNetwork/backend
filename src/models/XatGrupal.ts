import {
  Model, Schema, model
} from 'mongoose';
import { IXat } from './Xat';

export interface IXatGrupal extends IXat {
    /** Últim missatge del XatGrupal */
    titol: string;
    /** Últim missatge del XatGrupal */
    descripcio: string;
    /** Últim missatge del XatGrupal */
    imatge: string;
  }

  interface IXatGrupalModel extends Model<IXatGrupal> { }

const schema = new Schema<IXatGrupal>({
  titol: { type: String, required: true },
  descripcio: { type: String, required: true },
  imatge: { type: String, required: true }
});

const xatGrupal: IXatGrupalModel = model<IXatGrupal, IXatGrupalModel>('XatGrupal', schema);

export default xatGrupal;
