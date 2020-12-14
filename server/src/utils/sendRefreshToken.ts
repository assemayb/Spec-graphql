import { Response } from "express"

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie("jid", token, {
        httpOnly: true, 
        // the path property forces the cookie to only be sent with requests to the 
        // given path/endpoint instead of all endpoints
        path: "/refresh_token"
    })
}