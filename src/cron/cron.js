const cron = require("node-cron");
const axios = require('axios');

cron.schedule('* * * * *', async() => {
  console.log('Cron job started!')
  console.log("CRON Active every 1 minutes !")
  try {
      await axios.post('http://localhost:3000/api/sendEmail', {
          title: 'CRON SEND Email',
          subject: 'Test Send Email By Cron 2 minutes ...',
          message: 'send email successfully !!',
      });

      console.log('Email sent successfully');
  }
  catch(error) {
      console.error('CRON Failed to send email:', error);
  }
})
