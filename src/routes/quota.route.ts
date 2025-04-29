import { Router } from 'express';
import { createQuotaController } from '../controllers/quota.controller';

const router = Router();

router.post('/createQuota', createQuotaController);

export default router;
