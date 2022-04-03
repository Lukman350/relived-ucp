import { connection } from "@/database";
import type { ApiResponseData } from "@/data-types";
import type { NextApiRequest, NextApiResponse } from "next";
import { sha256 } from "js-sha256";
import { randomString } from "@/components/Utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  const { method } = req;

  if (method === "POST") {
    const { type } = req.body;

    if (type === "password") {
      const { id, curPassword, newPassword } = req.body;

      const [user]: Array<any> = await connection
        .promise()
        .execute(
          "SELECT `Salt`, `Password`, `ID`, `Username` FROM accounts WHERE ID = ? LIMIT 1",
          [id]
        );

      if (user.length === 0) {
        res.status(400).json({
          success: false,
          data: null,
          error: "Account not found",
        });
        res.end();
        return;
      }

      const { Salt, Password, ID, Username } = user[0];

      const hash = sha256(curPassword + Salt)
        .toString()
        .toUpperCase();

      if (hash !== Password) {
        res.status(400).json({
          success: false,
          data: null,
          error: "Current password is incorrect",
        });
        res.end();
        return;
      }

      const newSalt = randomString(64);

      const newHash = sha256(newPassword + newSalt)
        .toString()
        .toUpperCase();

      await connection.execute(
        "UPDATE accounts SET `Salt` = ?, `Password` = ? WHERE `ID` = ?",
        [newSalt, newHash, ID]
      );

      res.status(200).json({
        success: true,
        data: {
          Username,
        },
        error: null,
      });
      res.end();
    } else if (type === "email") {
      const { id, curEmail, newEmail } = req.body;

      const [user]: Array<any> = await connection
        .promise()
        .execute(
          "SELECT `Email`, `ID`, `Username` FROM accounts WHERE ID = ? LIMIT 1",
          [id]
        );

      if (user.length === 0) {
        res.status(400).json({
          success: false,
          error: "Account not found",
          data: null,
        });
        res.end();
        return;
      }

      const { Email, ID, Username } = user[0];

      if (Email !== curEmail) {
        res.status(400).json({
          success: false,
          data: null,
          error: "Current email is incorrect",
        });
        res.end();
        return;
      }

      const [isEmailExists]: Array<any> = await connection
        .promise()
        .execute("SELECT `ID` FROM accounts WHERE Email = ?", [newEmail]);

      if (isEmailExists.length > 0) {
        res.status(400).json({
          success: false,
          data: null,
          error: "New email already exists",
        });
        res.end();
        return;
      }

      await connection.execute(
        "UPDATE accounts SET `Email` = ? WHERE `ID` = ?",
        [newEmail, ID]
      );

      res.status(200).json({
        success: true,
        data: {
          Username,
        },
        error: null,
      });
      res.end();
    } else {
      res.status(400).json({
        success: false,
        error: "Invalid type",
        data: null,
      });
      res.end();
      return;
    }
  } else {
    res.status(400).json({
      error: "Invalid method",
      success: false,
      data: null,
    });
    res.end();
  }
}
