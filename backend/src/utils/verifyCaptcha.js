const axios = require('axios');

const verifyCaptcha = async (token) => {
  const url = 'https://www.google.com/recaptcha/api/siteverify';

  const response = await axios.post(url, null, {
    params: {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token
    }
  });

  return response.data.success === true;
};

module.exports = verifyCaptcha;
