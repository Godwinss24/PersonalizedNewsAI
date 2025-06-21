import { UserService } from "../services/user/user.service";
import { UserController } from "../controller/user/user.controller";
import express from "express";
import { User } from "../models";
import dotenv from 'dotenv';
import { JwtService } from "../services/user/jwt.service";
dotenv.config();

const router = express.Router();

const jwtService = new JwtService(process.env.JWT_SECRET || 'fake-jwt');

const userService = new UserService(User, jwtService);

const userController = new UserController(userService);

router.post('/', userController.registerUserControl.bind(userController));

router.post('/login', userController.loginUserControl.bind(userController));

module.exports = router;