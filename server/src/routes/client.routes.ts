import { Router } from 'express';
import { 
  getClientById, 
  createClient, 
  updateClient,
  getAllClients,
  deleteClient
} from '../controllers/client.controller';

const router = Router();

router.get('/', getAllClients);
router.get('/:id', getClientById);
router.post('/', createClient);
router.patch('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;