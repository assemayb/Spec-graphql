import { Sequelize } from "sequelize"


export const dbConfig = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
    // storage: path.join(path.dirname(__filename), "../db.sqlite")
});
