import {
  Ctx,
  ObjectType,
  Int,
  InputType,
  Mutation,
  Arg,
  Query,
  UseMiddleware,
  Subscription,
  PubSub,
  PubSubEngine,
  Root,
} from "type-graphql";
import {
  CreateThreadInput,
  ThreadType,
  UpdateThreadInput,
} from "./threadResolverTypes";

import { Thread } from "../models/Thread";
import { MyContext } from "../utils/context";

import { isAuthenticated } from "../utils/isAuth";
import { User } from "../models/User";

const thread_channel = "threads_channel";

export class ThreadResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async createThread(
    @PubSub() pubSub: PubSubEngine,
    @Arg("options", () => CreateThreadInput) options: CreateThreadInput,
    @Ctx() { payload }: MyContext
  ): Promise<boolean> {
    const { question, specialization } = options;
    try {
      const thread = await Thread.create({
        question,
        specialization,
        threadCreator: payload?.userId,
      });

      // puslish to subscription channel
      const JSONThread = thread.toJSON();
      await pubSub.publish(thread_channel, JSONThread);

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  // thread creation sub
  @Subscription(() => ThreadType, { topics: thread_channel })
  async threadCreated(
    @Root()
    { id, question, specialization, threadCreator, createdAt }: ThreadType
  ) {
    console.log({
      id,
      question,
      specialization,
      threadCreator,
      createdAt,
    });
    return { id, question, specialization, threadCreator, createdAt };
  }

  // get thread data by id
  @Query(() => ThreadType, { nullable: true })
  async getThread(
    @Arg("id", () => Int) id: number,
    @Arg("sortBy", () => String) sortBy: string,
    @Ctx() { req, res, payload }: MyContext
  ) {
    try {
      const thread = await Thread.findOne({
        where: { id },
        include: "replies",
      });
      const replies = thread && thread.getDataValue("replies");
      let sortedReplies: any;
      if (sortBy === "upvotes") {
        sortedReplies = replies?.sort((a, b) => {
          return b.upvotes - a.upvotes;
        });
      } else {
        sortedReplies = replies?.sort((a, b) => {
          return b.id - a.id;
        });
      }
      thread?.setDataValue("replies", sortedReplies!);

      return thread;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  // Update a certian thread
  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async updateThread(
    @Arg("id", () => Int) id: number,
    @Arg("options", () => UpdateThreadInput) options: UpdateThreadInput,
    @Ctx() { req, res, payload }: MyContext
  ) {
    let thread = await Thread.findOne({ where: { id } });
    const threadCreatorID = thread?.getDataValue("threadCreator");
    const requestUserID = payload?.userId;
    const requestUserName = payload?.userName;
    if (
      threadCreatorID == requestUserID ||
      threadCreatorID == requestUserName
    ) {
      try {
        await Thread.update(options, {
          where: {
            id,
          },
        });
        return true;
      } catch (err) {
        console.error(err.message);
        return false;
      }
    } else {
      throw new Error("Not Authenticated to perform this action");
    }
  }

  @Query(() => Int)
  @UseMiddleware(isAuthenticated)
  async getUserThreadsNumber(@Ctx() { payload }: MyContext) {
    try {
      const threadsNum = await Thread.count({
        where: {
          threadCreator: payload?.userId,
        },
      });

      return threadsNum;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
  // List user threads
  @Query(() => [ThreadType], { nullable: true })
  @UseMiddleware(isAuthenticated)
  async listUserThreads(
    @Ctx() { req, payload }: MyContext,
    @Arg("offset", () => Int) offset: number,
    @Arg("limit", () => Int, { nullable: true }) limit: number
  ) {
    const loggedUserId = payload?.userId as number;
    try {
      const userThreads = await Thread.findAll({
        where: {
          threadCreator: loggedUserId,
        },
        offset,
        limit,
      });
      return userThreads;
      
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Query(() => [ThreadType], { nullable: true })
  async listOtherUserThreads(@Arg("username", () => String) username: string) {
    try {
      const user = await User.findOne({ where: { username } });
      const usernameID = user?.getDataValue("id");
      const userThreads = await Thread.findAll({
        where: { threadCreator: usernameID },
      });
      return userThreads;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // List all Threads
  @Query(() => [ThreadType], { nullable: true })
  async listThreads(
    @Arg("sortBy", () => String) sortBy: string,
    @Arg("offset", () => Int) offset: number,
    @Arg("limit", () => Int) limit: number
  ) {
    let threads;
    console.log(limit, offset);

    try {
      if (sortBy == "recent") {
        threads = await Thread.findAll({
          include: "replies",
          order: [["id", "DESC"]],
          offset,
          limit,
        });
      } else {
        threads = await Thread.findAll({ include: "replies", offset, limit });

        const repliesCount = (thread: any): number => {
          return thread.getDataValue("replies").length;
        };
        let sortedByReplies: typeof threads = threads.sort((a, b) => {
          return repliesCount(b) - repliesCount(a);
        });
        threads = [...sortedByReplies];
      }
      let idx = 0;
      for (let thread of threads) {
        let creator = await User.findOne({
          where: { id: thread.getDataValue("threadCreator") },
        });
        thread.setDataValue(
          "threadCreator",
          creator!.getDataValue("username")! as any
        );
        threads[idx] = thread;
        idx += 1;
      }
      return threads;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  @Query(() => Int, { nullable: false })
  async getThreadsNum() {
    try {
      const threadsNum = await Thread.count();
      return threadsNum;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  // list all specs
  @Query(() => [String])
  async listTopics() {
    try {
      let imported = await import("../utils/constnats");
      let topics = imported.specs;
      return topics;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // list topic-related threads
  @Query(() => [ThreadType], { nullable: true })
  async lisTopicThreads(
    @Arg("topic", () => String) topic: string,
    @Arg("offset", () => Int) offset: number,
    @Arg("limit", () => Int) limit: number
  ) {
    let topicsThreads;
    try {
      topicsThreads = await Thread.findAll({
        where: {
          specialization: topic,
        },
        offset,
        limit,
        include: "replies",
      });
      let idx = 0;
      for (let thread of topicsThreads) {
        let creator = await User.findOne({
          where: { id: thread.getDataValue("threadCreator") },
        });
        thread.setDataValue(
          "threadCreator",
          creator!.getDataValue("username")! as any
        );
        topicsThreads[idx] = thread;
        idx += 1;
      }
    } catch (error) {
      throw new Error(error.message);
    }
    return topicsThreads;
  }

  @Query(() => Int, { nullable: false })
  async getTopicThreadsNum(
    @Arg("topic", () => String, { nullable: false }) topic: string
  ) {
    try {
      const threadsNum = await Thread.count({
        where: {
          specialization: topic,
        },
      });
      return threadsNum;
    } catch (error) {
      console.error(error.message);
      return null;
    }
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
          id,
        },
      });
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}
