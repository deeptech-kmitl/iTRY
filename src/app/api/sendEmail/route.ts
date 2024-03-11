import nodemailer from "nodemailer"
import { MailOptions } from "nodemailer/lib/json-transport"


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

export default async function sendEmail(mailOptions: MailOptions) {
  await transporter.sendMail(mailOptions)
}