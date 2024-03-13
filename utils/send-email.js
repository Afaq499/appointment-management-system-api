import nodemailer from 'nodemailer';

export const sendEmail = async (email, subject, bodyPart) => {

  const {
    MAIL_USERNAME: user,
    MAIL_PASSWORD: pass,
    MAIL_HOST: host,
    MAIL_PORT: port
  } = process.env;
  const transporter = nodemailer.createTransport({
    host,
    // secure: true,
    port,
    auth: {
      user,
      pass
    }
  });

  try {
    await transporter.sendMail({
      from: user,
      to: email,
      subject,
      html: bodyPart
    });
  } catch (err) {
  }

};
