import { MiddlewareFn } from "type-graphql"
import { MyContext } from "./context"
import { verify } from "jsonwebtoken"

export const isAuthenticated: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"]
    if (!authorization) {
        throw new Error("No Authorization Header")
    }
    try {
        const token = authorization.split(" ")[1]
        console.log(token)
        const paylaod = verify(token, process.env.ACCESS_TOKEN_SECRET!)
        context.payload = paylaod as any
    } catch (error) {
        throw new Error("Not Authenticated")
    }
    return next()
} 