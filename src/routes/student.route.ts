import { Router } from 'express';
import studentController from '../controllers/student.controller'

const router = Router();

router.get('/getAllStudent', studentController.allCarsController);
router.post('/createStudent', studentController.createCarsController);

export default router;
