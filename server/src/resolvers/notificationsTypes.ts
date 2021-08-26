import { ObjectType, InputType, Field, Int } from "type-graphql";
import {ReplyType, reply as Reply} from "./replyResolverTypes"




@ObjectType()
export class NotificationType  {

    @Field(() => Int)
    id?: number

    @Field(() => Boolean)
    opend?: boolean

    @Field(() => Int)
    userId?: number

    @Field(() => Int)
    replyId?:  number
}