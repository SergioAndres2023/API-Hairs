import unauthorized from './auth.middleware.js';

function middlewareAdmin(req, res, next) {
  if (req.user.rol !== 'admin') {
    unauthorized(res);
    return;
  }
  next();
}

export default middlewareAdmin;
