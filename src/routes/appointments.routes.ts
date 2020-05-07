import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

// The listAppointments type array and one array of Appointment
const listAppointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  // Convert string to date and format the hour
  const parsedDate = startOfHour(parseISO(date));

  // Verify if exist appointment the list with date
  const findAppointmentInSameDate = listAppointments.find(appointment =>
    isEqual(appointment.date, parsedDate),
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const newAppointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  listAppointments.push(newAppointment);

  return response.json(newAppointment);
});

export default appointmentsRouter;
