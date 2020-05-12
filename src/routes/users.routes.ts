import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';

import User from '../models/User';

const usersRouter = Router();

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

export default usersRouter;
