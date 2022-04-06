import { connection } from "@/database";
import { ApiResponseData } from "@/data-types";
import type { NextApiRequest, NextApiResponse } from "next";
import authenticate from "@/services/auth";

export default authenticate(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  const { method } = req;

  if (method === "GET") {
    const { id }: any = req.query;

    if (parseInt(id) < 1) {
      res.status(400).json({
        success: false,
        error: "Invalid owner",
        data: null,
      });

      return;
    }

    const [rows]: Array<any> = await connection
      .promise()
      .execute("SELECT `ID`, `Model` FROM `player_vehicles` WHERE Owner = ?", [
        id,
      ]);

    if (rows.length === 0) {
      res.status(404).json({
        success: false,
        error: "You don't have any vehicle",
        data: null,
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: rows,
      error: null,
    });
  } else {
    res.status(500).json({
      success: false,
      error: "Method not allowed",
      data: null,
    });
  }
});

export const config = {
  api: {
    externalResolver: true,
  },
};
