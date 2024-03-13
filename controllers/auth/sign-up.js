import mongoose from "mongoose";

import User from '../../models/user';

import { generateToken } from '../../middlewares/auth';
import { throwError } from '../../utils/error-msg';
import { emailVerificationTemplate } from '../../utils/email-templates';
import { sendEmail } from '../../utils/send-email';

const SignUp = async ({
  firstName,
  lastName,
  email,
  phone,
  company,
  address,
  password,
  coupon
}) => {

  const { postalCode, state, city, addressLine1 } = address;
  if (
    !firstName ||
    !email ||
    !password ||
    !phone ||
    !postalCode ||
    !state ||
    !city ||
    !addressLine1
  ) {
    throw throwError('Please Provide Complete Information.', 400);
  }
  let user = await User.findOne({ email });
  if (user) {
    throw throwError('This Email Already Exists.', 409);
  }
  user = await User.create({
    _id: mongoose.Types.ObjectId().toHexString(),
    firstName,
    lastName,
    email,
    phone,
    company,
    address,
    password,
    coupon
  });
  const { _id } = user
  const { token } = generateToken({
    _id,
    email,
    name: firstName,
  });
  await sendEmail(
    email,
    'Account Verification Link!',
    emailVerificationTemplate(
      firstName,
      token,
    ),
  );
  return {
    message: 'SignUp Successfully!',
  };
}

export default SignUp;
