import experss, { Response, Request } from "express";
import { verify } from "jsonwebtoken";
import { Thread } from "../../models/Thread";

export const getCurrentUserThreads = async (req: Request, res: Response) => {
  {
    try {
      const token = req.cookies["jid"];
      let payload: any = verify(token, process.env.REFRESH_TOKEN_SECRET!);
      const userId: number = payload.userId!;
      const userThreads = await Thread.findAll({
        where: {
          threadCreator: userId,
        },
      });
      return res.status(200).json({
        count: userThreads.length,
        threads: userThreads,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
};
