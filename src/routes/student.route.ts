import { Router } from 'express';
import {
    getStudentByDniController,
    allStudentController,
    createStudentController,
    getStudentByIdController,
    deleteStudentByIdController,
    modificationStudentByIdController,
    getStudentByNameController
  } from '../controllers/student.controller';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/getAllStudent', authMiddleware, allStudentController);
router.post('/createStudent', authMiddleware, createStudentController);
router.get('/dni', getStudentByDniController);
router.get('/id',authMiddleware, getStudentByIdController);
router.delete('/deleteId', authMiddleware, deleteStudentByIdController);
router.patch('/:id', authMiddleware, modificationStudentByIdController);
router.get('/name', authMiddleware, getStudentByNameController)

export default router;
