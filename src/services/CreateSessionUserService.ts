import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
class CreateSessionUserService {
  public async excute({ email, password }: RequestDTO): Promise<Response> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({
      select: ['id', 'name', 'email', 'password'],
      where: {
        email,
      },
    });
    const errorMensage = 'Incorrect email/password combination.';

    if (!user) {
      throw Error(errorMensage);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw Error(errorMensage);
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    delete user.password;

    return { user, token };
  }
}
export default CreateSessionUserService;
