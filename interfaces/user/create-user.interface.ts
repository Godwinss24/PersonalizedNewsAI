import { UserCategory } from "enums/categories.enum";
import { Request } from "express";

export interface CreateUser {
    email: string;
    password: string;
    category: UserCategory[];
}

export interface CreateUserRequest extends Request {
    body: {
        email: string;
        password: string;
        category: UserCategory[];
    }
}
export interface LoginUserRequest extends Request {
    body: {
        email: string;
        password: string;
    }
}