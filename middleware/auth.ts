import { NextFunction, Request, Response } from 'express';
import jwt, { Secret, JwtPayload, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createResponse } from '../utilities/createResponse';



dotenv.config();

export interface CustomRequest extends Request {
    user?: { id: string; email: string };
}

const authenticateToken = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const jtoken = req.headers['authorization']?.split(' ')[1];

        if (!jtoken) {

            res.status(401).send(createResponse(null, false,"Token missing, Please sign in again" ));
            return; // Early return to prevent calling next()
        }

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {

            res.status(500).send(createResponse(null, false,"Internal server error. Secret key not configured." ));
            return; // Early return to prevent calling next()
        }

        const decoded = jwt.verify(jtoken, secretKey) as JwtPayload;
        req.user = { id: decoded.id, email: decoded.email };
       
        next(); // Call next() to proceed

    } catch (error: any) {
        if (error instanceof TokenExpiredError) {
            res.status(401).send(createResponse(null, false, "Session expired. Please sign in again."));
            return;
        }
        if (error instanceof JsonWebTokenError) {
            res.status(403).send(createResponse(null, false, "Invalid token. Please sign in again."));
            return;
        }
        res.status(403).send(createResponse(null, false,error.message ));
    }
};
export default authenticateToken;