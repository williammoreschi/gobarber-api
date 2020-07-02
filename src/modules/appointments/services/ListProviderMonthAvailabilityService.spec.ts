import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the month availability from providers', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user-provider',
      user_id: 'user-id',
      date: new Date(2020, 5, 25, 8, 0, 0),
    });

    const appointments: any = [];
    const schedules = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    schedules.map(schedule =>
      appointments.push(
        new Promise(resolve => {
          resolve(
            fakeAppointmentsRepository.create({
              provider_id: 'user-provider',
              user_id: 'user-id',
              date: new Date(2020, 5, 26, schedule, 0, 0),
            }),
          );
        }),
      ),
    );

    await Promise.all(appointments);

    await fakeAppointmentsRepository.create({
      provider_id: 'user-provider',
      user_id: 'user-id',
      date: new Date(2020, 5, 27, 11, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user-provider',
      month: 6,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 25, available: true },
        { day: 26, available: false },
        { day: 27, available: true },
      ]),
    );
  });
});
