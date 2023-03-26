const Client = require ('../models/client.ts');
import  { IClient }  from '../models/client';


// Controlador para crear un nuevo cliente
export const createClient = async (req: any, res: any) => {
  try {
    const { name, lastName, email, phone, location, password } = req.body;
    const client: IClient = new Client({ name, lastName, email, phone, location, password});
    const savedClient: IClient = await client.save();
    res.json(savedClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

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