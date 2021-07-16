import { Sequelize } from "sequelize"


export const dbConfig = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite',
    pool: {
        max: 100
    },

    // retry: {
    //     max: 100
    // }
    // storage: path.join(path.dirname(__filename), "../db.sqlite")
});
