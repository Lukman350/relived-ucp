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
    const { ucp } = req.body;

    if (!ucp) {
      res.status(400).json({
        success: false,
        error: "Missing ucp",
        data: null,
      });
      return;
    }

    const [result]: Array<any> = await connection
      .promise()
      .execute(
        "SELECT `ID`, `Username`, `Email`, `Admin`, `RegisterDate`, `IP` FROM `accounts` WHERE `Username` = ? LIMIT 1",
        [ucp]
      );

    if (result.length === 0) {
      res.status(400).json({
        success: false,
        error: "User not found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      error: null,
      data: result[0],
    });
  } else {
    res.status(400).json({
      error: "Invalid method",
      success: false,
      data: null,
    });
  }
});

export const config = {
  api: {
    externalResolver: true,
  },
};
