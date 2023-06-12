import unauthorized from '../api/users/users.service.js';

export default function middleware(req, res, next) {
  if (req.user.role !== 'admin') {
    unauthorized(res);
    return;
  }

  next();
}
