import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { semesterRegistrationServices } from './ semesterRegistration.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createSemesterRegistration = catchAsync(async (req:Request, res:Response) => {
    const result = await semesterRegistrationServices.createSemesterToDb(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration is created succesfully',
    data: result,
  });
    
});


const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationServices.getAllSemesterRegistrationsFromDB(
        req.query,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is retrieved successfully !',
      data: result,
    });
  },
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await semesterRegistrationServices.getSingleSemesterRegistrationsFromDB(
        id,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is retrieved successfully',
      data: result,
    });
  },
);

// const updateSemesterRegistration = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result =
//       await semesterRegistrationServices.updateSemesterRegistrationIntoDB(
//         id,
//         req.body,
//       );

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Semester Registration is updated successfully',
//       data: result,
//     });
//   },
// );

// const deleteSemesterRegistration = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result =
//       await semesterRegistrationServices.deleteSemesterRegistrationFromDB(id);

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Semester Registration is updated successfully',
//       data: result,
//     });
//   },
// );

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
//   deleteSemesterRegistration,
//   updateSemesterRegistration,
  getSingleSemesterRegistration,
};
