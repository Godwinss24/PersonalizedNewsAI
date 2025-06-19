import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  async sendMail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: `"Personalized News AI" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}
export default new MailService();