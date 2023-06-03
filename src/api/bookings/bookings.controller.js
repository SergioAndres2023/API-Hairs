import * as bookingsService from './bookings.service.js';

function validBooking(bookingDataToValidate) {
  const date = !Number.isNaN(Date.parse(bookingDataToValidate.date));
  const state = typeof bookingDataToValidate.state === 'string';
  const userId = typeof bookingDataToValidate.userId === 'string';
  const serviceId = typeof bookingDataToValidate.serviceId === 'string';
  return date && state && userId && serviceId;
}

export async function getByDate(req, res) {
  const { date } = req.params;
  const activeUsers = await bookingsService.getByDate({ date });
  res.json(activeUsers);
}

export async function create(req, res) {
  const bookingDataToValidate = req.body;
  if (!validBooking(bookingDataToValidate)) {
    res.status(500);
    res.json('Data validation error');
    return;
  }
  const bookingDataValidated = bookingDataToValidate;
  const newBooking = await bookingsService.create({ bookingDataValidated });
  res.json(newBooking);
}

export async function update(req, res) {
  const { id } = req.params;
  const bookingDataToValidate = req.body;
  if (!validBooking(bookingDataToValidate)) {
    res.status(500);
    res.json('Data validation error');
    return;
  }
  const bookingDataValidated = bookingDataToValidate;
  const updatedBooking = await bookingsService.update({ id, bookingDataValidated });
  res.json(updatedBooking);
}
