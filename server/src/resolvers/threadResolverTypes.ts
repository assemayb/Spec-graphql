import { ObjectType, Field, Int } from "type-graphql"
@ObjectType()
class ReplyType {
    @Field(() => Int)
    id?: number
    @Field(() => String)
    text?: string
    @Field(() => String)
    upvotes?: number
    @Field(() => String)
    replySpecialist?: string;
    @Field(() => String)
    replyThread?: string
}

@ObjectType()
class ThreadType {
    @Field(() => Int)
    id?: number
    @Field(() => String)
    question?: string
    @Field(() => String)
    specialization?: string
}

