import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbURL = process.env.DATABASE_URL;

if (!dbURL) {
  throw new Error("Database credential is missing from .env file");
}

const sequelize = new Sequelize(dbURL as string, {
  dialect: "postgres",
  logging: false
});

export default sequelize;
