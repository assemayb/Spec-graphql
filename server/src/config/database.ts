import { Sequelize } from "sequelize"



export const dbConfig = new Sequelize('postgres', 'postgres', 'assem', {
    host: 'localhost',
    port : 5432,
    dialect: 'postgres'
});
