import { Document, model, Schema } from 'mongoose';
const bcrypt = require('bcrypt');

//Definiendo el esquema de Client
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
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  userLocation: { type: String, required: true },
});


//funcion middleware previa al guardado para cifrar la contraseña
clientSchema.pre<IClient>("save", async function (next: any)  {
  if (!this) return next(new Error('No hay cliente definido'));
  try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
  } catch (error) {
    next(error);
  }
})

export default model<IClient>('Client', clientSchema) 



