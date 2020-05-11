import { getRepository } from 'typeorm';
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

    const newUser = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(newUser);

    return newUser;
  }
}

export default CreateUserService;
