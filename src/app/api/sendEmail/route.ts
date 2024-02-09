import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import cron from 'node-cron'
import { CronJob } from "cron";
import axios from 'axios'
import { schedule } from '../create/staffActivity/mockupData';
import { Console } from 'console';

export async function POST(request: any) {
    try {
        console.log("_______ Begin ________")
        const {title, subject, message} = await request.json()
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: { // for sender
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        })

        const mailOption = {
            from: 'itrydpd@gmail.com',
            to: 'llPornpilin@gmail.com',
            subject: title,
            html: `
                <h3>Hello Camper !</h3>
                <li> title: ${subject}</li>
                <li> message: ${message}</li>
            `
        }

        await transporter.sendMail(mailOption)
        console.log("_______ Finish ________")

        return NextResponse.json({message: "Email Sent Successfully"}, {status: 200})
    }
    catch(error) {
        console.error(error)
        return NextResponse.json({message: "Fail to send Email"}, {status: 500})
    }
}


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

// ------------------------------------------------------------------------
// const logMessage = () => {
//     console.log("Cron job started!");
//     console.log("w,j9hv'lj'g,]");
// }

// logMessage()

// cron.schedule("* * * * *", logMessage);


