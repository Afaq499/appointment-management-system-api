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
        id: userId,
        phone: to
      },
      body: {
        appointmentDate,
        category,
      }
    } = req;

    const { message } = await CreateAppointment({
      to,
      appointmentDate,
      category,
      userId
    });
    res.status(200).json({ message });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }

});

export default router;
