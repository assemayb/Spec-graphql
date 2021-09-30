import { DataTypes, ModelDefined, Optional } from "sequelize";
import { dbConfig } from "../config/database";
import { Reply } from "./Reply";
export interface NotificationAttributes {
  id: number;
  opened: boolean;
  replyId: number;
  userId: number;
}

// export interface ReplyCreationAttributes extends Optional<ReplyAttributes> { }
export const Notification: ModelDefined<NotificationAttributes, {}> =
  dbConfig.define(
    "notification",
    {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      opened: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "notifications",
    }
  );

Reply.hasOne(Notification, {
  foreignKey: "replyId",
  onDelete: "CASCADE",
});
