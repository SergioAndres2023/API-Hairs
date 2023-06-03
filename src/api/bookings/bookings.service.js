import * as bookingsRepository from './bookings.repository.js';

export async function getByDate({ date }) {
  const activeUsers = await bookingsRepository.getByDate({ date });
  return activeUsers;
}

export async function create({ bookingData }) {
  const newBooking = await bookingsRepository.create({ bookingData });
  return newBooking;
}

export async function update({ id, bookingData }) {
  const updatedBooking = await bookingsRepository.update({ id, bookingData });
  return updatedBooking;
}
