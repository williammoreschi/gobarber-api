import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123321',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe 1',
      email: 'johndoe1@email.com',
    });

    expect(updateUser.name).toBe('John Doe 1');
    expect(updateUser.email).toBe('johndoe1@email.com');
  });

  it('should not be able update non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user',
        name: 'John Doe 1',
        email: 'johndoe1@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update email if it already exists in another user', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123321',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe 1',
      email: 'teste@email.com',
      password: '123321',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe 1',
        email: 'johndoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123321',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe 1',
      email: 'johndoe1@email.com',
      old_password: '123321',
      password: '147258369',
    });

    expect(updateUser.password).toBe('147258369');
  });

  it('should not be able update the password if old password not informed', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123321',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe 1',
        email: 'johndoe1@email.com',
        password: '147258369',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the password if old password incorrect', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123321',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe 1',
        email: 'johndoe1@email.com',
        old_password: 'old-password-incorrect',
        password: '147258369',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
