import { Document, model, Schema } from 'mongoose';

export interface IClient extends Document {
  name: String,
  password: String,
  lastName: String,
  email: String,
  phone: String,
  userLocation: String
}
const clientSchema = new Schema({
  name: { type: String, required: true },
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: { type: String, required: true },
  phone: { type: String, required: true },
  userLocation: { type: String, required: true },
});

export default model<IClient>('Client', clientSchema) 



