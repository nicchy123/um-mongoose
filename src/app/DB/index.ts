import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

export const seedSuperAdmin = async () => {
  const superAdmin = {
    id: '0001',
    email: 'nasirchy252@gmail.com',
    password: config.super_admin_password,
    needsPasswordChange: false,
    role: USER_ROLE.superAdmin,
    status: 'in-progress',
    isDeleted: false,
  };
  const isUserExists = await User.findOne({
    id: superAdmin.id,
    role: USER_ROLE.superAdmin,
  });
  if (!isUserExists) {
    await User.create(superAdmin);
  }
};
