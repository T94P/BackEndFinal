import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
// Adicione mais rotas conforme necessário

export default router;