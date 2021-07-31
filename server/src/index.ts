import "reflect-metadata";
import experss, { Response, Request } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { dbConfig } from "./config/database";
import { ApolloServer } from "apollo-server-express";

import { buildSchema } from "type-graphql";
import { verify } from "jsonwebtoken";

import { HelloResolver } from "./resolvers/helloResolver";
import { UserResolver } from "./resolvers/userResolver";
import { ThreadResolver } from "./resolvers/threadResolver";
import { ReplyResolver } from "./resolvers/replyResolver";

import { User } from "./models/User";
import { sendRefreshToken } from "./utils/sendRefreshToken";
import { createRefreshToken, createAccessToken } from "./utils/auth";

(async () => {
  const app = experss();
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

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies["jid"];
    if (!token) {
      res.json({ ok: false, accessToken: "" });
    }
    try {
      let payload: any = verify(token, process.env.REFRESH_TOKEN_SECRET!);
      console.log("================>");
      console.log(payload);
      // let transaction = await dbConfig.transaction();
      let user = await User.findOne({ where: { id: payload.userId } });
      if (!user) {
        res.json({ ok: false, accessToken: "" });
      }
      sendRefreshToken(res, createRefreshToken(user as any));
      return res.json({
        ok: true,
        accessToken: createAccessToken(user as any),
      });
    } catch (error) {
      console.log(error);
      return res.json({ ok: false, accessToken: "" });
    }
  });

  // connection the database
  dbConfig
    .authenticate()
    .then(() => console.log("Database connection is successful"))
    .then(() => dbConfig.sync(/*    { force: true }  */))
    // .then(() => dbConfig.sync( { force: true }  ))
    .catch((err) => console.log(err));

  // graphql apollo server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, ThreadResolver, ReplyResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = 8000;
  // const PORT = 8200
  app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
  });
})();
