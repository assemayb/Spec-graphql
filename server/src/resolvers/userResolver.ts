import { ObjectType, Int, Field, Resolver, Mutation, Arg, Query, Ctx, UseMiddleware } from 'type-graphql';
import User from "../models/User"

import { dbConfig } from "../config/database"
import { hash, compare } from "bcryptjs"
import { LoginResponse, UserType, UserUpdateInputType } from "./userResolversTypes"
import { sendRefreshToken } from '../utils/sendRefreshToken';
import { createAccessToken, createRefreshToken } from '../utils/auth';
import { isAuthenticated } from "../utils/isAuth"
import { MyContext } from '../utils/context';


@Resolver()
export class UserResolver {
    @Query(() => [UserType], { nullable: true })
    async getAllUsers() {
        let users;
        try {
            users = User.findAll()
        } catch (error) {
            console.error(error)
            return null
        }
        return users
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("username", () => String) username: string,
        @Arg("password", () => String) password: string,
        @Arg("email", () => String) email: string
    ) {
        const hashedPassword = await hash(password, 12)
        try {
            await User.create({
                username,
                password: hashedPassword,
                email
            })
        } catch (err) {
            console.error(err)
            return false
        }
        return true
    }

    @Mutation(() => LoginResponse, {nullable: true})
    async loginUser(
        @Arg("username", () => String) username: string,
        @Arg("password", () => String) password: string,
        @Ctx() { res }: MyContext
    ) {

        let transaction = await dbConfig.transaction()
        let user = await User.findOne({
            where: {
                username,
            },
            transaction
        })
        if (!user) {
            throw new Error("No matching username")
        }
        const valid = await compare(password, user.getDataValue("password"))
        if (!valid) {
            throw new Error("Invalid Password")
        }
        sendRefreshToken(res, createRefreshToken(user as any))
        return {
            accessToken: createAccessToken(user as any),
            user
        }

    }

    @Mutation(() => Boolean)
    async logout(
        @Ctx() { res }: MyContext
    ) {
        sendRefreshToken(res, "")
        return true
    }

    @Query(() => String)
    @UseMiddleware(isAuthenticated)
    test(
        @Ctx() { payload }: MyContext
    ) {
        return `your id is ${payload?.userId}`
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("id", () => Int) id: number) {
        try {
            User.destroy({
                where: {
                    id
                }
            })
        } catch (error) {
            console.log(error)
            return false
        }
        return true
    }

    @Mutation(() => Boolean)
    async updateUserInfo(@Arg("id", () => Int) id: number,
        @Arg("options", () => UserUpdateInputType) options: UserUpdateInputType) {
        try {
            await User.update(options, {
                where: {
                    id
                }
            })
            return true;
        } catch (err) {
            console.error(err)
            return false;
        }
    }
}

