import express from 'express';
import { semesterRegistrationController } from './ semesterRegistration.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
// import { SemesterRegistrationController } from './semesterRegistration.controller';
// import { SemesterRegistrationValidations } from './semesterRegistration.validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
);


// router.patch(
//   '/:id',
//   validateRequest(
//     SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
//   ),
//   SemesterRegistrationController.updateSemesterRegistration,
// );

router.get(
  '/:id',
  semesterRegistrationController.getSingleSemesterRegistration,
);

router.get('/', semesterRegistrationController.getAllSemesterRegistrations);

export const semesterRegistrationRoutes = router;
