import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateSessionUserService from '@modules/users/services/CreateSessionUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;
let createSessionUser: CreateSessionUserService;

describe('CreateSessionUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    createSessionUser = new CreateSessionUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a the user session', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '147258369',
    });

    const response = await createSessionUser.execute({
      email: 'johndoe@email.com',
      password: '147258369',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to create a the session if does not user exists', async () => {
    await expect(
      createSessionUser.execute({
        email: 'johndoe@email.com',
        password: '147258369',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a the session if does password incorrect', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '147258369',
    });

    await expect(
      createSessionUser.execute({
        email: 'johndoe@email.com',
        password: '147258368',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
