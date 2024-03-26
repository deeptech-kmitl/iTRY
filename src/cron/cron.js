const cron = require("node-cron");
const axios = require('axios');
require('dotenv').config()

cron.schedule('* * * * *', async() => {
  console.log('----- Cron job started! -----')

  const domain = process.env.NEXTAUTH_URL || "http://localhost:3000"
  console.log('on : ' + domain)

  await axios.post(`${domain}/api/sendEmail/byCron`);
})
