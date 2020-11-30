import { DataTypes, ModelDefined, Optional } from "sequelize";
import { dbConfig } from "../config/database";


interface SpecialistAttributes {
    id: Number;
    username: string;
    password: string;
    specialization: string;
    fullName: string;
    email: string;
    age: number;
}

interface SpecialistCreationAttributes
    extends Optional<SpecialistAttributes, "id"> { }

export const Specialist: ModelDefined<
    SpecialistAttributes,
    SpecialistCreationAttributes
> = dbConfig.define(
    "Specialist",
    {
        id: {
            type: DataTypes.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER(),
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        specialization: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
    },
    {
        tableName: "specialists",
    }
);

