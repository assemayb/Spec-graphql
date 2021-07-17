import { Sequelize } from "sequelize"


// export const dbConfig = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'path/to/database.sqlite',
//     retry: {
//         max: 100
//     }

// });

export const dbConfig = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost',
    port : 5432,
    dialect: 'postgres'
});
