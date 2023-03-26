import { Document, model, Schema } from 'mongoose';

export interface ICliente extends Document {
  nombre: string;
  email: string;
  telefono: string;
}

const clienteSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true },
});

export default model<ICliente>('Cliente', clienteSchema);
