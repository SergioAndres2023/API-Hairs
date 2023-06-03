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

export async function update(req, res) {
  const { id } = req.params;
  const bookingDataToValidate = req.body;
  const bookingDataValidated = bookingDataToValidate;
  const updatedBooking = await bookingsService.update({ id, bookingDataValidated });
  res.json(updatedBooking);
}
