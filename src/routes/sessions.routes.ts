import { Router } from 'express';

import CreateSessionUserService from '../services/CreateSessionUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const CreateSessionUser = new CreateSessionUserService();
    const { user, token } = await CreateSessionUser.excute({ email, password });
    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
