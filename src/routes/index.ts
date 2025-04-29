import { Router } from 'express';
import student from './student.route';
import admin from './adminRoutes';
import quota from './quota.route';


const router = Router();

router.use('/student', student);
router.use('/admin', admin);
router.use('/quota', quota);


export default router;