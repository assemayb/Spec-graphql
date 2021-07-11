import { sign } from "jsonwebtoken"
import { UserAttributes, UserCreationAttributes, } from "../models/User"


export const createAccessToken = (user: UserAttributes) => {
    return sign({ userId: user.id, userName: user.username }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "30m"
    })
}

export const createRefreshToken = (user: UserAttributes) => {
    return sign({ userId: user.id, userName: user.username }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "10d"
    })
}

