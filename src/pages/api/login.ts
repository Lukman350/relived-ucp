import { connection } from "@/database";
import { sha256 } from "js-sha256";
import jwt from "jsonwebtoken";
import type { ApiResponseData } from "@/data-types";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  const { method } = req;

  if (method === "POST") {
    const { ucp, password } = req.body;

    if (!ucp || !password) {
      res.status(400).json({
        success: false,
        data: null,
        error: "Missing required fields",
      });
      res.end();
      return;
    }

    const sql: string =
      "SELECT * FROM accounts WHERE Username = ? OR Email = ?";
    connection.execute(sql, [ucp, ucp], (err: any, rows: Array<any>) => {
      if (err) {
        res.status(500).json({
          success: false,
          data: null,
          error: "Internal server error (Wrong SQL)",
        });
        res.end();
        return;
      } else {
        if (rows.length === 0) {
          res.status(404).json({
            success: false,
            data: null,
            error: "User not found",
          });
          res.end();
          return;
        }

        const user: any = rows[0];

        const isMatch =
          sha256(password + user.Salt)
            .toString()
            .toUpperCase() === user.Password;

        if (!isMatch) {
          res.status(401).json({
            success: false,
            data: null,
            error: "Password is incorrect",
          });
          res.end();
          return;
        }

        const token = jwt.sign(
          {
            user: {
              id: user.ID,
              username: user.Username,
              email: user.Email,
              admin: user.Admin,
            },
          },
          "SECRET",
          {
            expiresIn: "1h",
          }
        );

        res.status(200).json({
          success: true,
          error: null,
          data: {
            token,
          },
        });
        res.end();
      }
    });
  } else {
    res.status(400).json({
      success: false,
      data: null,
      error: "Invalid request method",
    });
    res.end();
  }
}
