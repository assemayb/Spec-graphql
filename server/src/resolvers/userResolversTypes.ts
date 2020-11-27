import { ObjectType, Int, Field, Resolver, Mutation, Arg, Query, InputType } from 'type-graphql';



@ObjectType()
export class UserInputsType {
    @Field(() => String, { nullable: true })
    username?: string

    @Field(() => String, { nullable: true })
    password?: string

    @Field(() => String, { nullable: true })
    email?: string
}

@InputType()
export class UserUpdateInputType {
    @Field(() => String, { nullable: true })
    username?: string

    @Field(() => String, { nullable: true })
    password?: string

    @Field(() => String, { nullable: true })
    email?: string

}
@ObjectType()
export class UserType extends UserInputsType {
    @Field(() => Int, { nullable: true })
    id?: number
}

@ObjectType()
export class LoginResponse {
    @Field(() => String)
    accessToken?: string

    @Field(() => UserType)
    user?: UserType
}
