import { DataTypes, ModelDefined, Optional } from 'sequelize'
import { dbConfig } from '../config/database'

import { Thread } from "./Thread"
import { Reply } from "./Reply"

export interface UserAttributes {
    id: number
    username: string
    password: string
    email: string
    isSpec: boolean
    spec: string
}

export interface UserCreationAttributes extends Optional<UserAttributes, "email" | "id" | "spec"> { }

export const User: ModelDefined<UserAttributes, UserCreationAttributes> = dbConfig.define("user", {
    id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(120)
    },
    password: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    isSpec: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    spec: {
        type: DataTypes.STRING(200),
        allowNull: true,
    }
}, {
    tableName: "users"
})


User.hasMany(Thread, {
    foreignKey: "threadCreator"
})


User.hasMany(Reply, {
    foreignKey: "replySpecialist",
})
