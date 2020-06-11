import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

const usersRouter = Router();
const uploadMulter = multer(uploadConfig);

const usersContoller = new UsersController();
const userAvatarController = new UserAvatarController();

// usersRouter.get('/', async (request, response) => {
//  const users = await usersRespository.find({
//    select: ['id', 'name', 'email'],
//  });
//  return response.json(users);
// });

usersRouter.post('/', usersContoller.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadMulter.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
