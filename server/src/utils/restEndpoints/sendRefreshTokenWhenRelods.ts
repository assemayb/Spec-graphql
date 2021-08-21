import experss, { Response, Request } from "express";
import { verify } from "jsonwebtoken";
import { Thread } from "../../models/Thread";
import { User } from "../../models/User";
import { createAccessToken, createRefreshToken } from "../auth";
import { sendRefreshToken } from "../sendRefreshToken";

export const sendRefreshTokenWhenAppReloads = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies["jid"];
  if (!token) {
    return res.json({ ok: false, accessToken: "" });
  }
  try {
    let payload: any = verify(token, process.env.REFRESH_TOKEN_SECRET!);

    let user = await User.findOne({ where: { id: payload.userId } });
    if (!user) {
      res.json({ ok: false, accessToken: "" });
    }
    sendRefreshToken(res, createRefreshToken(user as any));
    return res.json({
      ok: true,
      accessToken: createAccessToken(user as any),
    });
  } catch (error) {
    console.log(error);
    return res.json({ ok: false, accessToken: "" });
  }
};
