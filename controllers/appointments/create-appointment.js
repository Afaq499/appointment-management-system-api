import axios from "axios";
import dotenv from 'dotenv';
import mongoose from "mongoose";

import Appointment from "../../models/appointment";

import { throwError } from '../../utils/error-msg';

dotenv.config();

const mobileId = process.env.PHONE_ID;
const accessKey = process.env.DEVELOPER_ACCESS_KEY;

const CreateAppointment = async ({
  to,
  appointmentDate,
  category,
  userId
}) => {
  console.log({
    to,
    appointmentDate,
    category,
    userId
  });
  // if (!appointmentDate || !category) throw throwError('Please Provide Complete Information.', 400);

  // const res = await Appointment.create({
  //   _id: mongoose.Types.ObjectId().toHexString(),
  //   userId,
  //   appointmentDate,
  //   category,
  // });

  try {
    let data = JSON.stringify({
      "messaging_product": "whatsapp",
      "to": `${to}`,
      "type": "template",
      "template": {
        "name": "template_with_image",
        "language": {
          "code": "en_US"
        },
        "components": [
          {
            "type": "header",
            "parameters": [
              {
                "type": "text",
                "text": 'category'
              }
            ]
          },
          {
            "type": "body",
            "parameters": [
              {
                "type": "text",
                "text": "[Appointment Details](https://afaq-khan.netlify.app)"
              },
              {
                "type": "text",
                "text": "📅 Date: 13/03/24"
              },
              {
                "type": "text",
                "text": "⏰ Time: 9:00 am"
              },
              {
                "type": "text",
                "text": "⏳ Duration: 1 hour"
              },
            ]
          }
        ]
      }
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://graph.facebook.com/v18.0/${mobileId}/messages`,
      headers: {
        'Authorization': `Bearer ${accessKey}`,
        'Content-Type': 'application/json',
        'Cookie': 'ps_l=0; ps_n=0'
      },
      data: data
    };

    const res = await axios.request(config);
    console.log('res => ', res?.data);
    return { success: true, message: 'Appointment Created successfully' };
  } catch (error) {
    console.log('error => ', error?.response?.data);
    throw throwError('Please Provide Complete Information.', 400);
  }
}

export default CreateAppointment;