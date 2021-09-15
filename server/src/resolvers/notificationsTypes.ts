import { ObjectType, InputType, Field, Int } from "type-graphql";
import { ReplyType, reply as Reply } from "./replyResolverTypes";

@ObjectType()
export class NotificationType {
  @Field(() => Int)
  id?: number;

  @Field(() => Boolean)
  opened?: boolean;

  @Field(() => Int)
  userId?: number;

  @Field(() => Int, { nullable: true })
  replyId?: number;
}

@ObjectType()
export class ReplyNotifType {
  @Field(() => Int)
  id?: number;

  @Field(() => Int)
  upvotes?: number;
  @Field(() => String)
  text?: string;

  @Field(() => Int)
  replyThread?: number;

  @Field(() => String, { nullable: true })
  replySpecialist?: string;

  @Field(() => Int, { nullable: true })
  replySpecialistId?: number
}
