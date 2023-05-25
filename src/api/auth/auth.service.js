import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt'; // libreria de encriptacion
import * as usersRepo from '../users/users.repository.js';
