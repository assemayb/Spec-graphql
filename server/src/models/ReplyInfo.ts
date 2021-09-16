import { DataTypes, ModelDefined, Optional } from "sequelize";
import { dbConfig } from "../config/database";
import { Reply } from "./Reply";

export interface ReplyInfoAttributes {
  id: number;
  userUpvoteId: number;
  infoReplyId: number;
}

// export interface ReplyCreationAttributes extends Optional<ReplyAttributes> { }
export const ReplyInfo: ModelDefined<ReplyInfoAttributes, {}> = dbConfig.define(
  "replyInfo",
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },

    userUpvoteId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  },
  {
    tableName: "repliyInfo",
  }
);


Reply.hasMany(ReplyInfo, {
    foreignKey: "infoReplyId"
})