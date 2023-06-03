import * as bookingsRepository from './bookings.repository.js';

export async function getByDate({ date }) {
  const activeUsers = await bookingsRepository.getByDate({ date });
  return activeUsers;
}

export async function create({ bookingDataValidated }) {
  const newBooking = await bookingsRepository.create({ bookingDataValidated });
  return newBooking;
}

export async function update({ id, bookingDataValidated }) {
  const updatedBooking = await bookingsRepository.update({ id, bookingDataValidated });
  return updatedBooking;
}
