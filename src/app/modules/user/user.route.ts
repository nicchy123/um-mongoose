import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
// import { studentValidations } from '../student/student.validation';
import { AdminValidations } from '../Admin/admin.validation';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  //   validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post('/create-admin', validateRequest(AdminValidations.createAdminValidationSchema), UserControllers.createAdmin);
router.post('/create-faculty',   validateRequest(createFacultyValidationSchema), UserControllers.createFaculty);
router.get('/me', auth("student","faculty","admin"), UserControllers.getMe);
router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);
export const UserRoutes = router;
