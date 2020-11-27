import "reflect-metadata"
import experss, { Response, Request } from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import { dbConfig } from "./config/database"
import { ApolloServer } from "apollo-server-express"

import { buildSchema } from "type-graphql"

import { HelloResolver } from "./resolvers/helloResolver"
import { UserResolver } from "./resolvers/userResolver"

(async () => {
    const app = experss()
    dotenv.config({
        path: `${__dirname}/config/.env`
    })

    // express server middlewares
    app.use(cookieParser())
    app.use(morgan("dev"))
    app.use(cors({
        credentials: true
    }))
    
    // connection the database
    dbConfig.authenticate()
    .then(() => console.log("Database connection is successful"))
    .then(() => dbConfig.sync( /*    { force: true }  */))
    .catch((err) => console.log(err));

    // graphql apollo server
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, UserResolver ]
        }),
        context: ({ req, res }) => ({ req, res })
    })
    apolloServer.applyMiddleware({ app, cors: false })

    const PORT = 8000
    app.listen(PORT, () => {
        console.log(`server is running at port ${PORT}`)
    })
})()