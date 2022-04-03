// @ts-ignore
import query from "samp-query";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiResponseData } from "@/data-types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  const { method } = req;

  if (method === "GET") {
    const options = {
      host: "15.235.140.64",
      port: 7777,
    };

    await query(options, (err: string, data: object) => {
      if (err) {
        res.status(500).json({
          success: false,
          data: null,
          error: "Internal server error",
        });
        res.end();
        return;
      }

      res.status(200).json({
        success: true,
        data,
        error: null,
      });
      res.end();
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
