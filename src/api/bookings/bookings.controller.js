import * as bookingsService from './bookings.service.js';

export async function getByDate(req, res) {
  const { date } = req.params;
  const activeUsers = await bookingsService.getByDate({ date });
  res.json(activeUsers);
}
