import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import Jwt from 'jsonwebtoken';
import { User } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = Jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

      if(!decoded){
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

    const { role, userId, iat } = decoded;


    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    
    // checking if the user is exist
    const user = await User.isUserExistsByCustomId(userId);


    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

       if (
         user.passwordChangedAt &&
         User.isJWTIssuedBeforePasswordChanged(
           user.passwordChangedAt,
           iat as number,
         )
       ) {
         throw new AppError(
           httpStatus.UNAUTHORIZED,
           'You are not authorized !',
         );
       }


    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    req.user = decoded;
    next();
  });
};
