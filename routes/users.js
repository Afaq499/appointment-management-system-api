import express from 'express';

import {
  GetUser,
  GetUsers
} from '../controllers/user';

import catchResponse from '../utils/catch-response';

const router = express.Router();

router.get('/get-users', async (req, res) => {

  try {
    const {
      user: {
        isAdmin
      }
    } = req;

    const { users, count } = await GetUsers({ isAdmin });
    res.status(200).json({ users, count });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }

});

router.get('/', async (req, res) => {
  try {
    const {
      _id: userId
    } = req.user;
    const {
      user,
      spApiStoreStatus,
      adStoreStatus,
      profileId
    } = await GetUser({ userId });

    res.status(200).json({ 
      user,
      spApiStoreStatus,
      adStoreStatus,
      profileId
    });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }

});

export default router;
