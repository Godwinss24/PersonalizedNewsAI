import express, { Request, Response } from "express";
import EmailController from "../controllers/email.controller";

const router = express.Router();

type EmailQuery = {
  email: string;
};

router.get(
  "/send-email",
  async (req: Request<{}, {}, {}, EmailQuery>, res: Response) => {
    EmailController.sendTestEmail(req, res);
  }
);

export default router;
