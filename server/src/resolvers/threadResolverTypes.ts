import { ObjectType, Field, Int, InputType } from "type-graphql"
@ObjectType()
export class ReplyType {
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
export class ThreadType {
    @Field(() => Int)
    id?: number

    @Field(() => String)
    question?: string

    @Field(() => String)
    specialization?: string

    @Field(() => String)
    threadCreator?: string
}
@InputType()
export class CreateThreadInput {
    @Field(() => String)
    question?: string

    @Field(() => String)
    specialization?: string

    @Field(() => String, {nullable: true})
    threadCreator?: string
}
