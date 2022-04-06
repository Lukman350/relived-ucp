import { connection } from "@/database";
import { sha256 } from "js-sha256";
import { randomString } from "@/components/Utils";
import { ApiResponseData } from "@/data-types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  const { method } = req;

  if (method === "POST") {
    const { ucpID, token, password } = req.body;

    if (!ucpID || !token || !password) {
      res.status(400).json({
        success: false,
        data: null,
        error: "Missing required fields",
      });

      return;
    }

    const [rows]: Array<any> = await connection
      .promise()
      .execute(
        "SELECT `ID`, `updated` FROM `forgot_request` WHERE `token` = ? AND `ucpID` = ? LIMIT 1",
        [token, ucpID]
      );

    if (rows.length === 0) {
      res.status(400).json({
        success: false,
        data: null,
        error: "Invalid token",
      });

      return;
    }

    const { ID, updated } = rows[0];

    // check if token is below 1 hour
    if (Date.now() / 1000 - updated > 3600) {
      await connection
        .promise()
        .execute("DELETE FROM `forgot_request` WHERE `ID` = ?", [ID]);
      res.status(400).json({
        success: false,
        data: null,
        error: "Token expired",
      });

      return;
    }

    const newSalt: string = randomString(64);

    const newHash: string = sha256(password + newSalt)
      .toString()
      .toUpperCase();

    const [update]: Array<any> = await connection
      .promise()
      .execute(
        "UPDATE `accounts` SET `Password` = ?, `Salt` = ? WHERE `ID` = ?",
        [newHash, newSalt, ucpID]
      );

    if (update.affectedRows === 0) {
      res.status(500).json({
        success: false,
        data: null,
        error: "Failed to update password",
      });

      return;
    }

    await connection
      .promise()
      .execute("DELETE FROM `forgot_request` WHERE `ID` = ?", [ID]);

    res.status(200).json({
      success: true,
      data: null,
      error: null,
    });
  } else {
    res.status(405).json({
      success: false,
      data: null,
      error: "Method not allowed",
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
