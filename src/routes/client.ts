import { 
  verifyEmail,
  getClients,
  getClientById,
  createClient,
  updateClientById,
  deleteClientById } from "../controllers/clienteController";

import { Router }  from 'express';


export const clienteRoutes = Router();

clienteRoutes.get('/', getClients);

clienteRoutes.get('/:id', getClientById);

clienteRoutes.get('/verify/:token', verifyEmail)

clienteRoutes.post('/', createClient);

clienteRoutes.put('/:id', updateClientById);

clienteRoutes.delete('/:id', deleteClientById);


