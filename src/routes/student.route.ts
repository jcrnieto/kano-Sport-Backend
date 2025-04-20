import { Router } from 'express';

const router = Router();

router.get('/getAllStudent', (req, res)=>{
    res.send('estoy en student');
});

export default router;