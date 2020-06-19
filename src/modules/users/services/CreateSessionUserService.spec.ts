import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionUserService from '@modules/users/services/CreateSessionUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('CreateSessionUser', () => {
  it('should be able to create a the user session', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createSessionUser = new CreateSessionUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.excute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '147258369',
    });

    const response = await createSessionUser.excute({
      email: 'johndoe@email.com',
      password: '147258369',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to create a the session if does not user exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createSessionUser = new CreateSessionUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      createSessionUser.excute({
        email: 'johndoe@email.com',
        password: '147258369',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a the session if does password incorrect', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createSessionUser = new CreateSessionUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.excute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '147258369',
    });

    expect(
      createSessionUser.excute({
        email: 'johndoe@email.com',
        password: '147258368',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
