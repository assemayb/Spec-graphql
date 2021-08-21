import { DataTypes, ModelDefined, Optional } from "sequelize";
import { dbConfig } from "../config/database";

export interface NotificationAttributes {
  id: number;
  opened: boolean
  threadCreator: number
  replySpecialist: number;
  replyThread: number;
}

// export interface ReplyCreationAttributes extends Optional<ReplyAttributes> { }
export const Notification: ModelDefined<NotificationAttributes, {}> = dbConfig.define(
  "notification",
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    // text: {
    //   type: DataTypes.STRING(800),
    //   allowNull: false,
    // },
    opened: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
  },
  {
    tableName: "notifications",
  }
);
