import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  models: [User], // Points to our model
  dialect: "postgres",
  logging: process.env.NODE_ENV === 'production' ? false : console.log,
});

export default sequelize;