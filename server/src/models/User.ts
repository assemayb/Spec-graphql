import { DataTypes, ModelDefined, Optional } from 'sequelize'
import { dbConfig } from '../config/database'

import { Thread } from "./Thread"

export interface UserAttributes {
    id: number
    username: string
    password: string
    email: string
}

export interface UserCreationAttributes extends Optional<UserAttributes, "email" | "id"> { }

export const User: ModelDefined<UserAttributes, UserCreationAttributes> = dbConfig.define("User", {
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
    }
}, {
    tableName: "users"
})


User.hasMany(Thread, {
    foreignKey: "threadCreator"
})

