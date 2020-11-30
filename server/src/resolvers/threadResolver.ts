import { Ctx, ObjectType, Int, InputType, Mutation, Arg, Query, UseMiddleware } from "type-graphql"
import { CreateThreadInput, ThreadType } from "./threadResolverTypes"

import { Thread, ThreadAttributes } from "../models/Thread"
import { MyContext } from "../utils/context";

import { isAuthenticated } from "../utils/isAuth"
import { dbConfig } from "../config/database";


export class ThreadResolver {

    // creating a new thread
    @Mutation(() => Boolean)
    @UseMiddleware(isAuthenticated)
    async createThread(
        @Arg("options", () => CreateThreadInput) options: CreateThreadInput,
        @Ctx() { payload } : MyContext
        ) {
        const { question, specialization, threadCreator } = options
        try {
            await Thread.create({
                question,
                specialization,
                threadCreator: payload?.userId
            })
        } catch (error) {
            console.log(error)
            return false
        }
        return true
    }

    // List a the logged-in User Threads
    @Query(() => [ThreadType], { nullable: true })
    @UseMiddleware(isAuthenticated)

    async listMyThreads(
        // @Arg("id", () => Int) id: string,
        @Ctx() { req, res, payload }: MyContext
    ) {
        let userThreads;
        try {

            userThreads = await Thread.findAll({
                // include: "threadCreator",
                where: {
                    threadCreator: payload?.userId
                }
            })
        } catch (error) {
            throw new Error(error)
        }
        return userThreads
    }

    // List a User threads
    @Query(() => [ThreadType], { nullable: true })
    async listUserThread(
        @Arg("id", () => Int) id: string,
    ) {
        let userThreads;
        try {

            userThreads = await Thread.findAll({
                // include: "threadCreator",
                where: {
                    threadCreator: id
                }
            })
        } catch (error) {
            throw new Error(error)
        }
        return userThreads
    }

    // List all Threads
    @Query(() => [ThreadType], { nullable: true })
    async listThreads() {
        let threads;
        try {
            threads = await Thread.findAll()
        } catch (error) {
            console.log(error)
            return null
        }
        return threads
    }

    // Delete a thread
    @Mutation(() => Boolean, { nullable: true })
    @UseMiddleware(isAuthenticated)
    async deleteThread(
        @Arg("id", () => Int) id: number,
        @Ctx() { payload }: MyContext
    ) {

        let transaction = await dbConfig.transaction();
        let thread = await Thread.findOne({
            where: {
                id,
            },
            transaction
        })
        const threadCreator = thread!.getDataValue("threadCreator")
        if (threadCreator == payload?.userId) {
            try {
                await Thread.destroy({
                    where: {
                        id
                    },
                    transaction
                })
                await transaction.commit();
                return true
            } catch (error) {
                await transaction.rollback()
                console.log(error)
                return false
            }
        } else {
            throw new Error("Not Authenticated to delete this thread")
        }

    }
}