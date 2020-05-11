import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../respositories/AppointmentsRepository';

import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const newAppointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(newAppointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
