import "reflect-metadata";
import experss, { Response, Request } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { dbConfig } from "./config/database";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";

import { buildSchema } from "type-graphql";
import { verify } from "jsonwebtoken";

import { HelloResolver } from "./resolvers/helloResolver";
import { UserResolver } from "./resolvers/userResolver";
import { ThreadResolver } from "./resolvers/threadResolver";
import { ReplyResolver } from "./resolvers/replyResolver";

import { User } from "./models/User";
import { sendRefreshToken } from "./utils/sendRefreshToken";
import { createRefreshToken, createAccessToken } from "./utils/auth";

const sendRefreshTokenWhenAppReloads = async (req: Request, res: Response) => {
  const token = req.cookies["jid"];
  if (!token) {
    return res.json({ ok: false, accessToken: "" });
  }
  try {
    let payload: any = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    console.log("================>");
    console.log(payload);
    console.log("================>");

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
};

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

  app.post("/refresh_token", (req, res) =>
    sendRefreshTokenWhenAppReloads(req, res)
  );

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

  // app.listen(() => {
  //   console.log(`server is running at port 8000`);
  // });
  httpServer.listen(8000, () => {
    console.log(`server is running at port 8000`);
  });
})();
