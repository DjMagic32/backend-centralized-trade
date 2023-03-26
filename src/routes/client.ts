const { Router } = require('express');
const {
  getClients,
  getClientById,
  createClient,
  updateClientById,
  deleteClientById,
} = require('../controllers/clienteController');

const router = Router();

router.get('/', getClients);

router.get('/:id', getClientById);

router.post('/', createClient);

router.put('/:id', updateClientById);

router.delete('/:id', deleteClientById);

module.exports = router;
