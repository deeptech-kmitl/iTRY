import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: any) {
    try {
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

        return NextResponse.json({message: "Email Sent Successfully"}, {status: 200})
    }
    catch(error) {
        return NextResponse.json({message: "Fail to send Email"}, {status: 500})
    }
}