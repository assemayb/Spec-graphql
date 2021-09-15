import { ObjectType, InputType, Field, Int } from "type-graphql";

@InputType()
export class ReplyCreateType {
  @Field(() => String, { nullable: false })
  text?: string;

  @Field(() => Int, { nullable: false })
  replyThread?: number;

  @Field(() => Int || String, { nullable: true })
  replySpecialist?: number | string;
}

export interface reply {
  id: number;
  text: string;
  upvotes: number;
  replyThread: number;
  replySpecialist?: number;
}
@ObjectType()
export class ReplyType {
  @Field(() => Int)
  id?: number;

  @Field(() => Int)
  upvotes?: number;
  @Field(() => String)
  text?: string;

  @Field(() => Int)
  replyThread?: number;

  @Field(() => Int, { nullable: true })
  replySpecialist?: number;
}
