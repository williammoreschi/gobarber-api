import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async excute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw Error('Email address already used.');
    }

    const hashPassoword = await hash(password, 8);

    const newUser = usersRepository.create({
      name,
      email,
      password: hashPassoword,
    });

    await usersRepository.save(newUser);

    delete newUser.password;

    return newUser;
  }
}

export default CreateUserService;
