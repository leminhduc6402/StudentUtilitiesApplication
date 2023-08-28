import { Router } from 'express';
import SOSYController from '../controllers/subjectOfSchoolYear.js';

const router = Router();

router.post('/create', SOSYController.create);
router.get('/', SOSYController.getAll);
router.patch('/:id', SOSYController.update);
router.delete('/:id', SOSYController.delete);

export default router;
