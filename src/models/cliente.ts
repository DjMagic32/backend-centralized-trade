import { Document, model, Schema } from 'mongoose';

export interface ICliente extends Document {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  ubicacion: string;
}

const clienteSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: {type : String, required: true},
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  ubicacion: { type: String, required: true },
});

export default model<ICliente>('Cliente', clienteSchema);
