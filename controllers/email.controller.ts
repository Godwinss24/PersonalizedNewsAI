import { Request, Response } from "express";
import MailService from "../services/mail.service";
import welcomeTemplate from "../emailTemplates/welcomeTemplate";

type EmailQuery = {
  email: string;
};

class EmailController {
  static async sendTestEmail(
    req: Request<{}, {}, {}, EmailQuery>,
    res: Response
  ) {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email parameter is required." });
    }

    try {
      const htmlContent = welcomeTemplate(email);
      const info = await MailService.sendMail(
        email,
        "Welcome to Personalized News AI",
        htmlContent
      );
      return res.json({ message: "Email sent successfully!", info });
    } catch (error) {
      return res.status(500).json({ message: "Failed to send email", error });
    }
  }
}

export default EmailController;
