const axios = require('axios');

const verifyCaptcha = async (token) => {
  const url = 'https://www.google.com/recaptcha/api/siteverify';

  const response = await axios.post(url, null, {
    params: {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token
    },
    timeout: 5000 // Ensure Google verification doesn't hang the request
  });

  return response.data.success === true;
};

module.exports = verifyCaptcha;
