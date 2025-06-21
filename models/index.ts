import sequelize from "../config/db";
import User from "./User";


sequelize.sync({ alter: false });


export { User }

