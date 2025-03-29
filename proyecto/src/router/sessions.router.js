import { Router } from 'express';
import SessionsController from '../controllers/sessions.controller.js';
import { passportCall } from '../middlewares/passportCall.js';
import { authorization } from '../middlewares/authorization.middleware.js';

const router = Router();
const {
  register,
  login,
  current,
} = new SessionsController();

router.post('/register', register);
router.post('/login', login);
router.get('/current', passportCall('jwt'), authorization('admin'), current);

export const sessionsRouter = router;




































































