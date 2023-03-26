import { Router } from 'express';
import {
  obtenerClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} from '../controllers/clienteController';

const router = Router();

router.get('/', obtenerClientes);

router.get('/:id', obtenerCliente);

router.post('/', crearCliente);

router.put('/:id', actualizarCliente);

router.delete('/:id', eliminarCliente);

export default router;
