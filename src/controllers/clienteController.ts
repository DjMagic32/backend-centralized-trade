import { RequestHandler } from 'express';
import Cliente, { ICliente } from '../models/cliente';

export const obtenerClientes: RequestHandler = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerCliente: RequestHandler = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) throw new Error('Cliente no encontrado');
    res.json(cliente);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const crearCliente: RequestHandler = async (req, res) => {
  try {
    const cliente: ICliente = new Cliente(req.body);
    await cliente.save();
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarCliente: RequestHandler = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cliente) throw new Error('Cliente no encontrado');
    res.json(cliente);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const eliminarCliente: RequestHandler = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) throw new Error('Cliente no encontrado');
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
