import { Table, Column, Model, DataType } from "sequelize-typescript";
import { CreationOptional } from "sequelize";

enum Category {
  TECH = "tech",
  SPORTS = "sports",
  HEALTH = "health",
}

@Table({ tableName: "users" })
export class User extends Model<User> {
  @Column({ type: DataType.STRING, allowNull: false })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({
    type: DataType.ENUM(...Object.values(Category)),
    allowNull: false,
  })
  category!: Category;

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: CreationOptional<number>;
}
