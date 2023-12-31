import { Router } from 'express';
import CourseRegisterController from '../controllers/courseRegister.js';

const router = Router();

router.post('/create', CourseRegisterController.create);
router.get('/find-by-lecturer', CourseRegisterController.findByLecturer);
router.get('/get-score-result', CourseRegisterController.getScoreResult);
router.get('/get-test-schedule', CourseRegisterController.getTestSchedule);
router.get('/get-schedule', CourseRegisterController.getScheduleUserByTime);
router.get('/get-tuition', CourseRegisterController.getTuitionUserBySchoolYear);
router.get('/', CourseRegisterController.getAll);
router.get('/:userid', CourseRegisterController.getAllByUserId);
router.patch('/:id', CourseRegisterController.updateScore);
router.delete('/:id', CourseRegisterController.delete);

export default router;
