import { Router } from 'express';
import {
    getStudentByDniController,
    allStudentController,
    createStudentController
  } from '../controllers/student.controller';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/getAllStudent', authMiddleware, allStudentController);
router.post('/createStudent', authMiddleware, createStudentController);
router.get('/dni', getStudentByDniController);

export default router;
