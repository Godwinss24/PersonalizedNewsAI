import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { EmailOptions } from '../interfaces/emailService';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendEmail = async (options: EmailOptions) => {
    const mailOptions = {
        from: options.from || `"My App" <${process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);

    } catch (err) {
        console.error("Email sending error:", err);
        throw new Error("Failed to send email");
    }
};