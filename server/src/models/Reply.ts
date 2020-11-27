import { DataTypes, ModelDefined, Optional } from "sequelize"

import Specialist from './Specialist'
import Thread from "./Thread"

import { dbConfig } from "../config/database"

interface ReplyAttributes {
    id: number
    text: string
    upvotes: number,
    replySpecialist: string;
    replyThread: string
}

const Reply: ModelDefined<ReplyAttributes, {}> = dbConfig.define("reply", {
    id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    upvotes: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        defaultValue: 0
    },
    replyThread: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    replySpecialist: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'replies'
})

// M : 1  relation with Thread 

// Reply.belongsTo(Thread, {
//     foreignKey: "replyThread"
// })


// 1 : M  relation with Specialist 
Specialist.hasMany(Reply, {
    foreignKey: "replySpecialist",
})

export default Reply;