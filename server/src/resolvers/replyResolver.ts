import { Ctx, Int, Mutation, Resolver, Query, UseMiddleware, Arg } from "type-graphql"


import { User, UserAttributes } from "../models/User"
import { Thread, ThreadAttributes } from "../models/Thread"
import { Reply, } from "../models/Reply"

import { isAuthenticated } from "../utils/isAuth"
import { MyContext } from "../utils/context"

@Resolver()
export class ReplyResolver {

    // add reply to a thread
    @Mutation(() => Boolean, {nullable:  false})
    async addReply(
        @Arg('replyThread', () => Int) replyThread: number,
        @Arg('text', () => String) text: string,
        // @Arg('upvotes', () => Int) upvotes: number,
        @Ctx() { req, payload }: MyContext
    ) {
        try {
            console.log(text);
            return true
        } catch (error) {
            console.log(error.message);
            return false

        }
    }
}