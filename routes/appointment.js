import express from 'express';

import {
  CreateAppointment
} from '../controllers/appointments';

import catchResponse from '../utils/catch-response';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      user: {
        id
      },
      body: {
        to
      }
    } = req;

    const { users, count } = await CreateAppointment({ to });
    res.status(200).json({ users, count });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }

});

export default router;
