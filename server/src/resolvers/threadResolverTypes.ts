import { ObjectType, Field, Int, InputType, } from "type-graphql"

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

    @Field(() => Date)
    createdAt?: string
}

@ObjectType()
export class UserThreadType {
    @Field(() => Int)
    id?: number

    @Field(() => String)
    question?: string

    @Field(() => String)
    specialization?: string

    @Field(() => Date)
    createdAt?: string
}

@InputType()
export class CreateThreadInput {
    @Field(() => String)
    question?: string

    @Field(() => String)
    specialization?: string

    @Field(() => String, { nullable: true })
    threadCreator?: string
}

@InputType()
export class UpdateThreadInput {
    @Field(() => String, { nullable: true })
    question?: string

    @Field(() => String, { nullable: true })
    specialization?: string

}


@ObjectType() 
export class TopicType {
    @Field(() => String)
    specializtion?: string 

    @Field(() => Int)
    threadsNum?: number 
}