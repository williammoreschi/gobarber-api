import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPassowordService from '@modules/users/services/ResetPassowordService';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    const resetPassowordService = container.resolve(ResetPassowordService);

    await resetPassowordService.excute({
      token,
      password,
    });

    return response.status(204).json();
  }
}

export default ResetPasswordController;
