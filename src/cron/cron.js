const cron = require("node-cron");
const axios = require('axios');
const AWS = require('aws-sdk')
const { DynamoDB } = AWS
require('dotenv').config()

cron.schedule('0 9 * * *', async() => {
  console.log('----- Cron job started! -----')

  await axios.post(`${window?.location?.origin}/api/sendEmail/byCron`);
})
