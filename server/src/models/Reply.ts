import { DataTypes, ModelDefined, Optional } from "sequelize";
import { dbConfig } from "../config/database";

export interface ReplyAttributes {
  id: number;
  text: string;
  upvotes: number;
  replySpecialist: number;
  replyThread: number;
}

// export interface ReplyCreationAttributes extends Optional<ReplyAttributes> { }
export const Reply: ModelDefined<ReplyAttributes, {}> = dbConfig.define(
  "reply",
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    upvotes: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "replies",
  }
);
