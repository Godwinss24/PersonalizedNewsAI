import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { UserCategory } from "../enums/categories.enum";
import sequelize from "../config/db";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare email: string;
  declare password: string;
  declare category: UserCategory;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(...Object.values(UserCategory)), // Pull enum values into Sequelize ENUM
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
