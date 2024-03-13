import Users from "../../models/user";

import { generateToken } from "../../middlewares/auth";
import { sendEmail } from "../../utils/send-email";
import { emailVerificationTemplate, resetPasswordTemplate } from "../../utils/email-templates";
import { throwError } from "../../utils/error-msg";

const ResendEmail = async ({
  email,
  type
}) => {
  try {
    const user = await Users.findOne({ email });
    if(!user) {
      throw throwError('This Email is not registered', 401);
    }

    const { _id, firstName: name } = user
    const { token } = generateToken({
      _id,
      email,
      name,
    });

    if (type === 'resetPassword') {
      await sendEmail(
        email,
        'Reset Password Link!',
        resetPasswordTemplate(
          name,
          token,
        ),
      );

    } else {
      await sendEmail(
        email,
        'Account Varification Link!',
        emailVerificationTemplate(
          name,
          token,
        ),
      );
    }

    return {
      message: 'Email Sent Successfully!'
    };
  } catch ({ error }) {
    throw throwError(error, 400);
  }
}

export default ResendEmail;
