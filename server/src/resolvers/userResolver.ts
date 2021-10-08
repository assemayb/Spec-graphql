import {
  ObjectType,
  Int,
  Field,
  Resolver,
  Mutation,
  Arg,
  Query,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { User } from "../models/User";

import { dbConfig } from "../config/database";
import { hash, compare } from "bcryptjs";
import {
  LoginResponse,
  UserType,
  UserUpdateInputType,
} from "./userResolversTypes";
import { sendRefreshToken } from "../utils/sendRefreshToken";
import { createAccessToken, createRefreshToken } from "../utils/auth";
import { isAuthenticated } from "../utils/isAuth";
import { MyContext } from "../utils/context";
import { verify } from "jsonwebtoken";

@Resolver()
export class UserResolver {
  @Query(() => UserType, { nullable: true })
  async me(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

      let me = await User.findOne({ where: { id: payload.userId } });
      return me;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  @Query(() => [UserType], { nullable: true })
  async getAllUsers(@Ctx() { req }: MyContext) {
    let users;
    try {
      users = User.findAll();
    } catch (error) {
      console.error(error);
      return null;
    }
    return users;
  }

  @Query(() => Boolean)
  isUserLoggedIn(@Ctx() { req }: MyContext) {
    const tokenCookie = req.cookies["jid"];
    if (!tokenCookie) {
      return false;
    }
    let payload;
    try {
      payload = verify(tokenCookie, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      return false;
    }
    return true;
  }
  @Mutation(() => Boolean)
  async register(
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string,
    @Arg("email", () => String) email: string,
    @Arg("isSpec", () => Boolean, { nullable: true }) isSpec: boolean,
    @Arg("spec", () => String, { nullable: true }) spec: string,
    @Ctx() { req }: MyContext
  ) {
    console.log("raw data", username, password, email);
    const hashedPassword = await hash(password, 6);
    console.log(username, hashedPassword, email, isSpec, spec);

    try {
      await User.create({
        username,
        password: hashedPassword,
        email,
        isSpec,
        spec,
      });
    } catch (err: any) {
      console.error(err.message);
      return false;
    }
    return true;
  }

  @Mutation(() => LoginResponse, { nullable: true })
  async loginUser(
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string,
    @Ctx() { res }: MyContext
  ) {
    let transaction = await dbConfig.transaction();

    let user = await User.findOne({
      where: {
        username,
      },
      transaction,
    });
    if (!user) {
      throw new Error("No matching username");
    }
    const valid = await compare(password, user.getDataValue("password"));
    if (!valid) {
      throw new Error("Invalid Password");
    }
    sendRefreshToken(res, createRefreshToken(user as any));
    return {
      accessToken: createAccessToken(user as any),
      user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");
    return true;
  }

  @Query(() => String)
  @UseMiddleware(isAuthenticated)
  test(@Ctx() { payload }: MyContext) {
    const name = `${payload?.userName! + payload?.userId}`;
    return name;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number) {
    try {
      User.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async updateUserInfo(
    @Ctx() { payload }: MyContext,
    @Arg("options", () => UserUpdateInputType) options: UserUpdateInputType
  ) {
    try {
      await User.update(options, {
        where: {
          id: payload?.userId,
        },
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
