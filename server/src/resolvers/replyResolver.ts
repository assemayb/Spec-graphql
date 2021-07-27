import {
  Ctx,
  Int,
  Mutation,
  Resolver,
  Query,
  UseMiddleware,
  Arg,
} from "type-graphql";

import { User, UserAttributes } from "../models/User";
import { Thread, ThreadAttributes } from "../models/Thread";
import { Reply, ReplyAttributes } from "../models/Reply";

import { isAuthenticated } from "../utils/isAuth";
import { MyContext } from "../utils/context";
import { ReplyCreateType } from "./replyResolverTypes";
import { ReplyType } from "./replyResolverTypes";

@Resolver()
export class ReplyResolver {
  // add reply to a thread
  @Mutation(() => Boolean, { nullable: false })
  @UseMiddleware(isAuthenticated)
  async addReply(
    @Arg("options", () => ReplyCreateType) options: ReplyCreateType,
    @Ctx() { req, payload }: MyContext
  ) {
    try {
      const replySpecialistID = payload?.userId;
      console.log("replySpecialistID", replySpecialistID);

      const { text, replySpecialist, replyThread } = options;
      await Reply.create({
        text,
        replySpecialist: replySpecialistID as number,
        replyThread,
      });
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  // list all all thread replies
  @Query(() => [ReplyType], { nullable: true })
  @UseMiddleware(isAuthenticated)
  async listThreadReplies(@Arg("threadId", () => Int) threadId: number) {
    let replies;
    try {
      replies = await Reply.findAll({
        where: {
          replyThread: threadId,
        },
      });
      console.log(replies);
    } catch (error) {
      throw new Error(error.message);
    }
    return replies;
  }

  @Mutation(() => Boolean, { nullable: false })
  @UseMiddleware(isAuthenticated)
  async upvoteReply(@Arg("id", () => Int) id: number) {
    try {
      let reply = await Reply.findOne({ where: { id } });
      const replyUpvotes = reply?.getDataValue("upvotes");
      reply?.setDataValue("upvotes", replyUpvotes! + 1);
    } catch (error) {
      console.log(error.message);
    }
  }
}
