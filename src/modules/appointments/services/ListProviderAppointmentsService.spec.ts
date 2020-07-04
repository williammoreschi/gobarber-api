import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'user-provider',
      user_id: 'user-id',
      date: new Date(2020, 5, 25, 13, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'user-provider',
      user_id: 'user-id',
      date: new Date(2020, 5, 25, 16, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'user-provider',
      day: 25,
      month: 6,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
