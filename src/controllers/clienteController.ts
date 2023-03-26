import Client, { IClient }  from '../models/client';
import jwt from "jsonwebtoken";
require('dotenv').config();

const {JWT_SECRET} = process.env;

// Controlador para crear un nuevo cliente
export const createClient = async (req: any, res: any) => {
  try {
    //verifico si viene JWT_SECRET de las variables de entorno, paso importante para poder seguir con la creacion de usuario, ya que se usa para hashear la contraseña
    if (!JWT_SECRET) throw new Error('No secret word provided');
    const { name, lastName, email, phone, userLocation, password, isVerified } = req.body;
    const client: IClient = new Client({ name, lastName, email, phone, userLocation, password, isVerified});
    await client.save();
    const token = jwt.sign({clientId: client._id}, JWT_SECRET)
    //envio el token por correo
    res.json({token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyEmail = async (req: any, res: any) => {
  const { token } = req.params;
  try {
    //primero verificamos si la palabra secreta contenida en JWT_SECRET existe en nuestro entorno:
    if(!JWT_SECRET) throw new Error ('No se proporcionó el secret');
    // verificamos si el token que llego por la url corresponde con el token generado por el usuario al momento del registro
    const decodedToken = jwt.verify(token, JWT_SECRET);
    //si el token pasado por URL esta en la memoria de JsonWebToken, la descifra con la palabra secreta y descubre el identificador de usuario al que corresponde el token
    if (typeof decodedToken === 'object' && decodedToken.hasOwnProperty('clientId')) {
      const {clientId} = decodedToken;
      //para marcar la cuenta del usuario como verificada, se utiliza el id del usuario que se utilizo como identificador del token en la funcion sign de JWT
      await Client.updateOne({_id: clientId}, {$set: {isVerified: true}})
      res.status(200).send('Cliente verificado');
    } else if (typeof decodedToken === 'string' ) {
      throw new Error(decodedToken);
    }  

  } catch (error: any) {
    console.log(error.message);
    res.status(400).send(error.message)
  }
}

// Controlador para obtener todos los clientes
export const getClients = async (req: any, res: any) => {
  try {
    const clients: IClient[] = await Client.find();
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controlador para obtener un cliente por su ID
export const getClientById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const client: IClient | null = await Client.findById(id);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controlador para actualizar un cliente por su ID
export const updateClientById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, lastName, email, phone, location } = req.body;
    const updatedClient: IClient | null = await Client.findByIdAndUpdate(
      id,
      { name, lastName, email, phone, location },
      { new: true }
    );
    if (updatedClient) {
      res.json(updatedClient);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controlador para eliminar un cliente por su ID
export const deleteClientById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const deletedClient: IClient | null = await Client.findByIdAndDelete(id);
    if (deletedClient) {
      res.json(deletedClient);
    } else {
      res.status(404).json({ message: 'Client not found'})
    }
  }
  catch (error:any){
    console.log(error.message);
    res.status(400).send(error.message);
  }
}