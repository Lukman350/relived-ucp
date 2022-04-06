import { connection } from "@/database";
import { ApiResponseData } from "@/data-types";
import type { NextApiRequest, NextApiResponse } from "next";
import authenticate from "@/services/auth";

export default authenticate(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  const { method } = req;

  if (method === "POST") {
    const { all, ucp } = await req.body;

    if (!ucp) {
      res.status(400).json({
        success: false,
        data: null,
        error: "Missing required fields",
      });

      return;
    }

    if (all === false) {
      const [rows]: Array<any> = await connection
        .promise()
        .execute("SELECT * FROM characters WHERE Username = ? LIMIT 1", [ucp]);

      if (rows.length === 0) {
        res.status(404).json({
          success: false,
          data: null,
          error: "User not found",
        });

        return;
      }

      const user = rows[0];

      res.status(200).json({
        success: true,
        data: user,
        error: null,
      });
    } else {
      const [rows]: Array<any> = await connection
        .promise()
        .execute(
          "SELECT `ID`, `Character`, `pScore`, `Gender` FROM characters WHERE Username = ? LIMIT 3",
          [ucp]
        );

      if (rows.length === 0) {
        res.status(404).json({
          success: false,
          data: null,
          error: "User not found",
        });

        return;
      }

      const user = rows;

      res.status(200).json({
        success: true,
        data: user,
        error: null,
      });
    }
  } else {
    res.status(405).json({
      success: false,
      data: null,
      error: "Method not allowed",
    });
  }
});

export const config = {
  api: {
    externalResolver: true,
  },
};
