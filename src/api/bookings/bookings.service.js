import * as bookingsRepository from './bookings.repository.js';

export async function getByDate({ date }) {
  const activeUsers = await bookingsRepository.getByDate({ date });
  return activeUsers;
}

export async function create({ bookingDataValidated }) {
  const newBooking = await bookingsRepository.create({ bookingDataValidated });
  return newBooking;
}

export async function logicDelete({ id }) {
  const activeUsers = await bookingsRepository.logicDelete({ id });
  return activeUsers;
}
