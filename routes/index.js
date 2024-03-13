import express from 'express';

import auth from './auth';
import user from './users';
import appointment from './appointment';

import { authenticateAuthToken } from '../middlewares/auth';

const router = express.Router();

router.use('/auth', auth);
router.use('/users', authenticateAuthToken, user);
router.use('/appointment', authenticateAuthToken, appointment);

export default router;
