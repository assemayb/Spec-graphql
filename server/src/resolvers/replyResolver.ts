import {
  Ctx,
  Int,
  Mutation,
  Resolver,
  Query,
  UseMiddleware,
  Arg,
  Subscription,
  Root,
  PubSub,
  PubSubEngine,
} from "type-graphql";

import { Reply } from "../models/Reply";
import { Notification } from "../models/Notification";

import { isAuthenticated } from "../utils/isAuth";
import { MyContext } from "../utils/context";
import { ReplyCreateType } from "./replyResolverTypes";
import { ReplyType } from "./replyResolverTypes";
import { Thread } from "../models/Thread";
import { ReplyNotifType } from "./notificationsTypes";
import { ReplyInfo } from "../models/ReplyInfo";

const reply_channel = "replies_channel";

@Resolver()
export class ReplyResolver {
  // add reply to a thread
  @Mutation(() => Boolean, { nullable: false })
  @UseMiddleware(isAuthenticated)
  async addReply(
    @PubSub() pubSub: PubSubEngine,
    @Arg("options", () => ReplyCreateType) options: ReplyCreateType,
    @Ctx() { req, payload }: MyContext
  ) {
    try {
      const replySpecialistID = payload?.userId;
      const replySpecialistUsername = payload?.userName;

      const { text, replyThread } = options;
      let reply = await Reply.create({
        text,
        replySpecialist: replySpecialistID,
        replyThread,
      });

      reply.setDataValue("replySpecialist", replySpecialistUsername!);
      let JSONReply: any = reply.toJSON();
      JSONReply.replySpecialistId = replySpecialistID as number;

      // publish the reply instance to the channel
      await pubSub.publish(reply_channel, JSONReply);

      // add to notifs table
      const threadData = await Thread.findByPk(replyThread);
      const threadCreatorId =
        threadData && threadData?.getDataValue("threadCreator");
      if (threadCreatorId !== replySpecialistID) {
        threadCreatorId &&
          (await Notification.create({
            replyId: reply.getDataValue("id"),
            userId: threadCreatorId,
          }));
      }
      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async deleteReply(@Arg("id", () => Int) id: number) {
    try {
      await Reply.destroy({
        where: {
          id,
        },
      });
      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  }

  @Subscription(() => ReplyNotifType, { topics: reply_channel })
  async onReplyCreated(
    @Root()
    {
      id,
      replySpecialist,
      replyThread,
      text,
      upvotes,
      replySpecialistId,
    }: ReplyNotifType
  ) {
    try {
      return {
        id,
        replySpecialist,
        replySpecialistId,
        replyThread,
        text,
        upvotes,
      };
    } catch (error) {
      console.log(error);
    }
  }

  // @Query(() => [], { nullable: true })
  // @UseMiddleware(isAuthenticated)
  // async listUserNotifs(@Arg("threadId", () => Int) threadId: number) {
  //   let notifications;
  //   try {
  //     notifications = await Notification.findAll({
  //       where: {

  //       },
  //     });
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  //   return notifications;
  // }

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
    } catch (error: any) {
      throw new Error(error.message);
    }
    return replies;
  }

  @Query(() => [ReplyType], { nullable: true })
  async listAllReplies() {
    try {
      const replies = await Reply.findAll({});
      return replies;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Boolean, { nullable: false })
  @UseMiddleware(isAuthenticated)
  async upvoteReply(
    @Arg("id", () => Int) id: number,
    @Ctx() { payload }: MyContext
  ) {
    try {
      let reply = await Reply.findOne({ where: { id } });
      const replyUpvotes = reply?.getDataValue("upvotes");
      await reply?.update({
        upvotes: replyUpvotes! + 1,
      });
      const userId = payload?.userId;
      const replyId = reply?.getDataValue("id");
      await ReplyInfo.create({
        userUpvoteId: userId,
        infoReplyId: replyId,
      });
      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  }

  @Query(() => [Int], { nullable: true })
  @UseMiddleware(isAuthenticated)
  async listUserLikedReplies(@Ctx() { payload }: MyContext) {
    try {
      const userId = payload?.userId;
      let repliesInfo = await ReplyInfo.findAll({
        where: {
          userUpvoteId: userId,
        },
      });
      let repliesIds = repliesInfo.map((rep, idx) => {
        let x = rep.getDataValue("infoReplyId");
        if (x == null) x = -1;
        return x;
      });

      repliesIds = Array.from(new Set(repliesIds));
      return repliesIds;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
