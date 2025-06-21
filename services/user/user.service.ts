import { CreateUser } from "../../interfaces/user/create-user.interface";
import { User } from "../../models";
import bcrypt from 'bcrypt';
import { JwtService } from "./jwt.service";
import { AppError } from "../../services/appError";

export class UserService {
    private jwtService: JwtService;

    constructor(private userRepo: typeof User, jwtServicee: JwtService) {
        this.jwtService = jwtServicee;
    }

    private saltRounds = 10;

    private async createNewUser(user: CreateUser) {
        return await this.userRepo.create(user);
    }

    private async findOneUserByEmail(email: string) {
        return await this.userRepo.findOne({
            where: {
                email
            }
        })
    }

    private async findOneUserById(id: string) {
        return await this.userRepo.findOne({
            where: {
                id
            }
        })
    }

    private async hashPassword(password: string) {
        return await bcrypt.hash(password, this.saltRounds);
    }

    private async comparePassword(plainPassword: string, hashedPassword: string) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    async registerUser(userData: CreateUser) {
        const existingUser = await this.findOneUserByEmail(userData.email);

        if (existingUser) {
            throw new AppError('A user with this email already exists', 400);
        }

        const hashedPassword = await this.hashPassword(userData.password);

        const newUser = await this.createNewUser({
            ...userData,
            password: hashedPassword
        });

        return newUser;
    }

    async loginUser(email: string, password: string) {
        const existingUser = await this.findOneUserByEmail(email);

        if (!existingUser) {
            throw new AppError('User not found', 404);
        }

        const comparePassword = await this.comparePassword(password, existingUser.password);

        if (!comparePassword) {
            throw new AppError('Incorrect Password', 400);
        }

        return await this.jwtService.generateJWT({ email, id: existingUser.id });
    }
}