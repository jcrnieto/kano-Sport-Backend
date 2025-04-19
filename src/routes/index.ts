import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.send('Hola mundo desde TypeScript + Express');
});

export default router;