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
import { User } from "../models/User";
import { Thread } from "../models/Thread";

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

      const { text, replySpecialist, replyThread } = options;
      let reply = await Reply.create({
        text,
        replySpecialist: replySpecialistID as number,
        replyThread,
      });
      reply.setDataValue("replySpecialist", replySpecialistUsername!);
      let JSONReply = reply.toJSON();
      await pubSub.publish(reply_channel, JSONReply);

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  @Subscription(() => ReplyType, { topics: reply_channel })
  async onReplyCreated(
    @Root() { id, replySpecialist, replyThread, text, upvotes }: ReplyType
  ) {
    try {
      // console.log({ id, replySpecialist, replyThread, text, upvotes });
      const threadCreator = await Thread.findOne({
          where: {id: replyThread}
      })
      console.log(threadCreator?.toJSON());
      
      // let notif = await Notification.create({
      //     replyId: id
      // })

      // console.log(notif);
      
      return { id, replySpecialist, replyThread, text, upvotes };
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
    } catch (error) {
      throw new Error(error.message);
    }
    return replies;
  }

  @Query(() => [ReplyType], { nullable: true })
  async listAllReplies() {
    try {
      const replies = await Reply.findAll({});
      return replies;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Boolean, { nullable: false })
  @UseMiddleware(isAuthenticated)
  async upvoteReply(@Arg("id", () => Int) id: number) {
    try {
      let reply = await Reply.findOne({ where: { id } });
      const replyUpvotes = reply?.getDataValue("upvotes");
      console.log(replyUpvotes);
      await reply?.update({
        upvotes: replyUpvotes! + 1,
      });
      let x = await Reply.findOne({ where: { id } });
      console.log(x?.getDataValue("upvotes"));

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}
