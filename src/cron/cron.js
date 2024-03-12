const cron = require("node-cron");
const axios = require('axios');
const AWS = require('aws-sdk')
const { DynamoDB } = AWS
require('dotenv').config()

cron.schedule('* * * * *', async() => {
  console.log('----- Cron job started! -----')

  await axios.post(`http://localhost:3000/api/sendEmail/byCron`);
  // await axios.post(`${window?.location?.origin}/api/sendEmail/byCron`); // ใส่ window.location ละไม่ทำงาน TT
})
