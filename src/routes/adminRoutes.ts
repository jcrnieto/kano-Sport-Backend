import { Router } from 'express';
import { loginAdminController } from '../controllers/admin.controller';

const router = Router();

router.post('/login', loginAdminController);

export default router;