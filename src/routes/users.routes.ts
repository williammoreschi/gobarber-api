import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import User from '../models/User';

const usersRouter = Router();
const uploadMulter = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
  const usersRespository = getRepository(User);
  const users = await usersRespository.find({
    select: ['id', 'name', 'email'],
  });
  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const newUser = await createUser.excute({
      name,
      email,
      password,
    });

    return response.json(newUser);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadMulter.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();
      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });
      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default usersRouter;
