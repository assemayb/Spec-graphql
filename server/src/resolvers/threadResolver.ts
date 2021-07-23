import { Ctx, ObjectType, Int, InputType, Mutation, Arg, Query, UseMiddleware } from "type-graphql"
import { CreateThreadInput, ThreadType, TopicType, UpdateThreadInput, UserThreadType } from "./threadResolverTypes"

import { Thread, ThreadAttributes } from "../models/Thread"
import { MyContext } from "../utils/context";

import { isAuthenticated } from "../utils/isAuth"
import { dbConfig } from "../config/database";
import sequelize from "sequelize"
import { User } from "../models/User";


export class ThreadResolver {

    @Mutation(() => Boolean)
    @UseMiddleware(isAuthenticated)
    async createThread(
        @Arg("options", () => CreateThreadInput) options: CreateThreadInput,
        @Ctx() { payload }: MyContext
    ) {
        // the threadCreator is implicitly added from the payload data
        const { question, specialization } = options
        // console.log({ question, specialization, threadCreator });

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

    // Update a certian thread
    @Mutation(() => Boolean)
    @UseMiddleware(isAuthenticated)
    async updateThread(
        @Arg("id", () => Int) id: number,
        @Arg("options", () => UpdateThreadInput) options: UpdateThreadInput,
        @Ctx() { req, res, payload }: MyContext
    ) {
        let thread = await Thread.findOne({ where: { id } })
        const threadCreatorID = thread?.getDataValue("threadCreator")
        const requestUserID = payload?.userId
        const requestUserName = payload?.userName
        if (threadCreatorID == requestUserID || threadCreatorID == requestUserName) {
            try {
                await Thread.update(options, {
                    where: {
                        id
                    },
                })
                return true
            } catch (err) {
                console.error(err.message)
                return false
            }
        } else {
            throw new Error("Not Authenticated to perform this action")
        }
    }


    // List a User threads
    @Query(() => [ThreadType], { nullable: true })
    @UseMiddleware(isAuthenticated)
    async listUserThreads(
        @Ctx() { req, payload }: MyContext
    ) {
        let userThreads;
        const loggedUserId = payload?.userId
        try {
            userThreads = await Thread.findAll({
                where: {
                    threadCreator: loggedUserId as number
                }
            })
        } catch (error) {
            throw new Error(error.message)
        }
        return userThreads
    }

    // List all Threads
    @Query(() => [ThreadType], { nullable: true })
    async listThreads(
        @Arg("sortBy", () => String) sortBy: string
    ) {
        let threads;
        try {
            if (sortBy == "recent") {
                threads = await Thread.findAll({
                    include: "replies",
                    order: [["id", "DESC"]],
                })
            } else {
                threads = await Thread.findAll({ include: "replies" })
                const repliesCount = (thread: any): number => {
                    return thread.getDataValue("replies").length
                }
                let sortedByReplies: typeof threads = threads.sort((a, b) => {
                    return repliesCount(b) - repliesCount(a)
                })
                threads = [...sortedByReplies]
            }
            let idx = 0
            for (let x of threads) {
                let creator = await User.findOne({
                    where: {
                        id: x.getDataValue("threadCreator")
                    }
                })
                x.setDataValue("threadCreator", creator!.getDataValue("username")! as any)
                threads[idx] = x
                idx += 1;
            }
            return threads

        } catch (error) {
            console.error(error.message)
            return null
        }
    }

    // list all specs
    @Query(() => [String])
    async listTopics() {
        try {
            let imported = await import("../utils/constnats")
            let topics = imported.specs
            return topics
        } catch (error) {
            throw new Error(error.message)
        }
    }


    // list topic-related threads
    @Query(() => [ThreadType], { nullable: true })
    async lisTopicThredas(
        @Arg("topic", () => String) topic: string
    ) {

        let topicsThreads;
        try {
            topicsThreads = await Thread.findAll({
                where: {
                    specialization: topic
                },
                include: 'replies'
            })
        } catch (error) {
            throw new Error(error.message)
        }
        return topicsThreads
    }

    @Mutation(() => Boolean, { nullable: true })
    @UseMiddleware(isAuthenticated)
    async deleteThread(
        @Arg("id", () => Int) id: number,
        @Ctx() { payload }: MyContext
    ) {

        try {
            await Thread.destroy({
                where: {
                    id
                },
            })
            return true
        } catch (error) {

            console.log(error.message)
            return false
        }

    }

}