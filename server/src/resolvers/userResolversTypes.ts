import { ObjectType, Int, Field,  InputType } from 'type-graphql';



@ObjectType()
export class UserInputsType {
    @Field(() => String, { nullable: false })
    username?: string

    @Field(() => String, { nullable: false })
    password?: string

    @Field(() => String, { nullable: true })
    email?: string


    @Field(() => Boolean, { nullable: false })
    isSpec?: boolean

    @Field(() => String, { nullable: true })
    spec?: string
}


@InputType()
export class UserUpdateInputType {
    @Field(() => String, { nullable: true })
    username?: string

    @Field(() => String, { nullable: true })
    password?: string

    @Field(() => String, { nullable: true })
    email?: string

    @Field(() => Boolean, { nullable: true })
    isSpec?: boolean

    @Field(() => String, { nullable: true })
    spec?: string

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
