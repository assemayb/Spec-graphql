import "reflect-metadata";
import experss from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { dbConfig } from "./config/database";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/helloResolver";
import { UserResolver } from "./resolvers/userResolver";
import { ThreadResolver } from "./resolvers/threadResolver";
import { ReplyResolver } from "./resolvers/replyResolver";

import { getCurrentUserThreads } from "./utils/restEndpoints/getCurrentUserThreads";
import { sendRefreshTokenWhenAppReloads } from "./utils/restEndpoints/sendRefreshTokenWhenRelods";

(async () => {
  const app = experss();
  const httpServer = createServer(app);

  dotenv.config({
    path: `${__dirname}/config/.env`,
  });

  // express server middlewares
  app.use(cookieParser());
  app.use(morgan("dev"));
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.post("/refresh_token", (res, req) =>
    sendRefreshTokenWhenAppReloads(res, req)
  );
  app.get("/get_user_threads", (res, req) => getCurrentUserThreads(res, req));

  // connection the database
  dbConfig
    .authenticate()
    .then(() => console.log("Database connection is successful"))
    .then(() => dbConfig.sync(/*    { force: true }  */))
    // .then(() => dbConfig.sync( { force: true }  ))
    .catch((err) => console.log(err));

  // graphql apollo server
  try {
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver, UserResolver, ThreadResolver, ReplyResolver],
        validate: false,
      }),
      subscriptions: {
        // path: "/subscriptions",
        path: "/subscriptions",
        
        onConnect: () => {
          console.log("Client connected for subscriptions");
        },
        onDisconnect: () => {
          console.log("Client disconnected");
        },
      },
      context: ({ req, res }) => ({ req, res }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    apolloServer.installSubscriptionHandlers(httpServer);
  } catch (err) {
    console.error(err);
  }

  httpServer.listen(8000, () => {
    console.log(`server is running at port 8000`);
  });
})();
