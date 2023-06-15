import unauthorized from './auth.middleware.js';

function middlewareAdmin(req, res, next, { allowOwnUser, collection }) {
  if (req.user.rol === 'admin' || (allowOwnUser && req.user.id === req.params.id)) {
    next();
    return;
  }
  unauthorized(res);
}

export default middlewareAdmin;
