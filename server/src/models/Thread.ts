import { DataTypes, ModelDefined } from "sequelize";
import { dbConfig } from "../config/database"

import { Reply, ReplyAttributes } from './Reply'



export interface ThreadAttributes {
    id: number
    question: string
    specialization: string
    threadCreator: number
    createdAt: string
    replies: ReplyAttributes[]
}

export const Thread: ModelDefined<ThreadAttributes, {}> = dbConfig.define("thread", {
    id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: DataTypes.STRING(600),
        allowNull: false
    },
    specialization: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    threadCreator: {
        type: DataTypes.INTEGER(),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE(),
        allowNull: false
    },
    // image: {
    //     type: DataTypes.B
    // } 
}, {
    tableName: "threads"
})


Thread.hasMany(Reply, {
    foreignKey: "replyThread"
})


