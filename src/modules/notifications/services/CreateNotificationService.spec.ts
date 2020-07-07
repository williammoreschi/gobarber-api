import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import CreateNotificationService from '@modules/notifications/services/CreateNotificationService';

let createNotification: CreateNotificationService;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateNotification', () => {
  beforeEach(() => {
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createNotification = new CreateNotificationService(
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new user', async () => {
    const notification = await createNotification.execute({
      content: 'Teste notication day',
      recipient_id: 'provider-id',
    });

    expect(notification).toHaveProperty('id');
  });
});
