import bookingModel from './bookings.model.js';

export async function getByDate({ date }) {
  const dateToFind = new Date(Date.parse(date));
  const activeUsers = await bookingModel
    .find({ date: dateToFind, deleted: false })
    .lean();
  return activeUsers;
}
