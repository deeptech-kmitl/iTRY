const cron = require("node-cron");
const axios = require('axios');
// const iTryDynamoDB = require("../app/api/utils/dynamoDB") // call DynamoDB new Version (now can not use)

// ----------------- For Test call DynamoDB last Version ----------------------------
const AWS = require('aws-sdk')
const { DynamoDB } = AWS
require('dotenv').config()
// const { NextApiRequest, NextApiResponse } = require('next')


// const dynamodb = new DynamoDB.DocumentClient({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.REGION,
// })
// ----------------------------------------------------------------------------------

// cron.schedule('* * * * *', async() => {
//   console.log('----- Cron job started! -----')

//     await axios.post('http://localhost:3000/api/sendEmail', {
//         title: 'CRON SEND Email To everyone',
//         subject: 'Welcome to iTRY',
//         message: 'send email to everyone successfully !!',
//     });
// })
