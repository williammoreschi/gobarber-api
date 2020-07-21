import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const keyCache = `providers-appointment-list:${provider_id}-${year}-${month}-${day}`;

    let appointment = await this.cacheProvider.recover<Appointment[]>(keyCache);

    if (!appointment) {
      appointment = await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year,
      });
      await this.cacheProvider.save(keyCache, classToClass(appointment));
    }
    return appointment;
  }
}

export default ListProviderAppointmentsService;
