import jwt from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const authenticate =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    let token = req.headers.authorization;

    if (token) {
      token = token.replace("Bearer ", "");
      jwt.verify(token, process.env.JWT_TOKEN!, async (err, decoded) => {
        if (!err && decoded) {
          return await fn(req, res);
        }

        res.status(401).json({
          success: false,
          data: null,
          error: "Unauthorized",
        });
      });
    } else {
      res.status(401).json({
        success: false,
        data: null,
        error: "Unauthorized",
      });
    }
  };

export default authenticate;
