import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.excute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123321',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.excute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123321',
    });

    await expect(
      createUser.excute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
