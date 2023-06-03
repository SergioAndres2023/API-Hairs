import * as bookingsService from './bookings.service.js';

export async function getByDate(req, res) {
  const { date } = req.params;
  const activeUsers = await bookingsService.getByDate({ date });
  res.json(activeUsers);
}

export async function create(req, res) {
  const bookingDataToValidate = req.body;
  const bookingDataValidated = bookingDataToValidate;
  const newBooking = await bookingsService.create({ bookingDataValidated });
  res.json(newBooking);
}
