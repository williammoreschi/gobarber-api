import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionUserService from '@modules/users/services/CreateSessionUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const CreateSessionUser = container.resolve(CreateSessionUserService);

    const { user, token } = await CreateSessionUser.excute({ email, password });
    return response.json({ user, token });
  }
}

export default SessionsController;
