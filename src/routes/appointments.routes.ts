import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../respositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointments = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.findByDate(parsedDate);

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const newAppointment = appointments.create(provider, parsedDate);

  return response.json(newAppointment);
});

export default appointmentsRouter;
