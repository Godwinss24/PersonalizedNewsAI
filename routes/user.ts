import { Request, Response } from "express";
import { UserService } from "../services/user/user.service";
import { UserController } from "../controller/user/user.controller";
import express from "express";
import { User } from "../models";
import dotenv from 'dotenv';
import { JwtService } from "../services/user/jwt.service";
import authenticateToken from "../middleware/auth";
dotenv.config();

const router = express.Router();

const jwtService = new JwtService(process.env.JWT_SECRET || 'fake-jwt');

const userService = new UserService(User, jwtService);

const userController = new UserController(userService);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - category
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                     - SPORT
 *                     - TECH
 *                     - WORLD
 *                     - BUSINESS
 *                     - POLITICS
 *                     - HEALTH
 *                     - SCIENCE
 *                     - ENTERTAINMENT
 *                     - UK
 *                     - ENGLAND
 *                     - WALES
 *                     - SCOTLAND
 *                     - NORTHERN_IRELAND
 *                     - MAGAZINE
 *                     - EDUCATION
 *                     - IN_PICTURES
 *                     - VIDEO_AND_AUDIO
 *                     - NEWSBEAT
 *                     - STORIES
 *                     - HAVE_YOUR_SAY
 *                     - WORLD_AFRICA
 *                     - WORLD_ASIA
 *                     - WORLD_EUROPE
 *                     - WORLD_LATIN_AMERICA
 *                     - WORLD_MIDDLE_EAST
 *                     - WORLD_US_CANADA
 *                     - CLIMATE
 *                     - CORONAVIRUS
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     category:
 *                       type: array
 *                       items:
 *                         type: string
 */

router.post('/', userController.registerUserControl.bind(userController));

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user and return JWT token
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */

router.post('/login', userController.loginUserControl.bind(userController));

/**
 * @swagger
 * /user/my-latest:
 *   get:
 *     summary: Get the latest news based on user's subscribed categories
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched latest news
 *       401:
 *         description: Unauthorized (missing or invalid JWT)
 *       500:
 *         description: Internal server error
 */


router.get('/my-latest', authenticateToken, userController.getMyLatest.bind(userController));

module.exports = router;