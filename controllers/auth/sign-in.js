import bcrypt from 'bcryptjs';

import User from '../../models/user';

import { generateToken } from '../../middlewares/auth';
import { throwError } from '../../utils/error-msg';

const SignIn = async ({
  password: pass,
  email
}) => {
  if (!pass || !email) {
    throw throwError('Email and Password is required.', 400);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw throwError('Invalid email or password.', 401);
  }
  const { _id, firstName, password, status, isAdmin, isStoreExist } = user;

  if (status === 'PENDING') {
    throw throwError('Please Validate Email First.', 401);
  }

  const isMatch = await bcrypt.compare(pass, password);
  if (!isMatch) {
    throw throwError('Invalid email or password.', 401);
  }

  const { token } = generateToken({
    _id,
    email,
    name: firstName,
  });
  return {
    token,
    user: {
      _id,
      email,
      firstName
    }
  };
};

export default SignIn;
