import * as bookingsRepository from './bookings.repository.js';

export async function getByDate({ date }) {
  const activeUsers = await bookingsRepository.getByDate({ date });
  return activeUsers;
}
