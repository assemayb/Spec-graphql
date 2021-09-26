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
import { NotificationType } from "./notificationsTypes";

@Resolver()
export class NotificationResolver {
  // get user notifications count
  @Query(() => Int)
  @UseMiddleware(isAuthenticated)
  async getNotifsCount(@Ctx() { payload }: MyContext) {
    try {
      const notifsCount = await Notification.count({
        where: {
          userId: payload?.userId,
          opened: false,
        },
      });
      return notifsCount;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // list user notifications
  @Query(() => [NotificationType])
  @UseMiddleware(isAuthenticated)
  async listUserNotifs(
    @Ctx() { payload }: MyContext,
    @Arg("offset", () => Int, { nullable: true }) offset: number,
    @Arg("limit", () => Int, { nullable: true }) limit: number
  ) {
    try {
      let notifs;
      const notNull = offset !== null && limit !== null;
      const notUndefined = offset !== undefined && limit !== undefined;
      if (notNull && notUndefined) {
        notifs = await Notification.findAll({
          where: {
            userId: payload?.userId,
          },
          offset: offset,
          limit: limit,
        });
      } else {
        notifs = await Notification.findAll({
          where: {
            userId: payload?.userId,
          },
        });
      }
      let newNotifs = [];
      for (let x of notifs) {
        const notif: any = x.toJSON();
        const reply = await Reply.findOne({ where: { id: notif.replyId } });
        const replyText = reply && reply?.getDataValue("text");
        notif.text = replyText;
        newNotifs.push(notif);
      }

      console.log(newNotifs.length);
      return newNotifs;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // update notification

  // delete notification
  @Mutation(() => Boolean, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async deleteNotif(
    @Arg("id", () => Int) id: number,
  ) {
    try {
      let notif = await Notification.findByPk(id);
      notif !== null &&
        (await Notification.destroy({
          where: {
            id,
          },
        }));
      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  }


}
