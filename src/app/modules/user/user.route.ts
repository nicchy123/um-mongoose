import express from 'express';
import { UserControllers } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { studentValidations } from '../student/student.validation';
import { AdminValidations } from '../Admin/admin.validation';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post('/create-student', auth(USER_ROLE.admin),  validateRequest(studentValidations.createStudentValidationSchema), UserControllers.createStudent);
router.post('/create-admin', validateRequest(AdminValidations.createAdminValidationSchema), UserControllers.createAdmin);
router.post('/create-faculty',   validateRequest(createFacultyValidationSchema), UserControllers.createFaculty);

export const UserRoutes = router;
