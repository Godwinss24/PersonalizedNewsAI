import { CreateUserRequest, LoginUserRequest } from "../../interfaces/user/create-user.interface";
import { UserService } from "../../services/user/user.service";
import { Response } from "express";
import { aResponse } from "../../interfaces/aResponse";
import { AppError } from "../../services/appError";
import { User } from "../../models";
import dotenv from 'dotenv';
dotenv.config();


export class UserController {
    private userService: UserService;
    constructor(userServicee: UserService) {
        this.userService = userServicee
    }
    private responseData: aResponse<null | string> = {
        message: '',
        data: null,
        successful: false
    }
    async registerUserControl(req: CreateUserRequest, res: Response) {
        try {
            await this.userService.registerUser(req.body);
            this.responseData.successful = true;
            this.responseData.message = 'User Created';
            res.status(200).json(this.responseData);
            return
        } catch (error) {
            console.error(error);

            const status = error instanceof AppError ? error.statusCode : 500;

            this.responseData.message = error instanceof AppError ? error.message : 'Internal Server Error';
            this.responseData.successful = false;

            res.status(status).send(this.responseData);
            return;
        }
    }

    async loginUserControl(req: LoginUserRequest, res: Response) {
        try {
            const jwt = await this.userService.loginUser(req.body.email, req.body.password);
            this.responseData.successful = true;
            this.responseData.message = 'Login Successful';
            this.responseData.data = jwt;
            res.status(200).json(this.responseData);
            return
        } catch (error) {
            console.error(error);
            const status = error instanceof AppError ? error.statusCode : 500;
            this.responseData.data = null;
            this.responseData.message = error instanceof AppError ? error.message : 'Internal Server Error';
            this.responseData.successful = false;

            res.status(status).send(this.responseData);

            return;
        }
    }
}