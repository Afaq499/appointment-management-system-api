import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const mobileId = process.env.PHONE_ID;
const accessKey = process.env.DEVELOPER_ACCESS_KEY;

const CreateAppointment = async ({
  to
}) => {
  let data = JSON.stringify({
    "messaging_product": "whatsapp",
    "to": `${to}`,
    "type": "template",
    "template": {
      "name": "abc_test",
      "language": {
        "code": "en_US"
      }
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

  await axios.request(config);
  return { success: true, message: 'Message sent successfully' };

}

export default CreateAppointment;