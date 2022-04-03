import { connection } from "@/database";
import { ApiResponseData } from "@/data-types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  const { method } = await req;

  if (method === "GET") {
    try {
      const [userRegistered]: Array<any> = await connection
        .promise()
        .execute("SELECT COUNT(*) AS count FROM accounts");

      const [totalCharacters]: Array<any> = await connection
        .promise()
        .execute("SELECT COUNT(*) AS count FROM characters");

      const [totalHouse]: Array<any> = await connection
        .promise()
        .execute("SELECT COUNT(*) AS count FROM houses");

      const [totalBusiness]: Array<any> = await connection
        .promise()
        .execute("SELECT COUNT(*) AS count FROM businesses");

      const [totalWorkshop]: Array<any> = await connection
        .promise()
        .execute("SELECT COUNT(*) AS count FROM workshop");

      const [totalFarms]: Array<any> = await connection
        .promise()
        .execute("SELECT COUNT(*) AS count FROM farms");

      res.status(200).json({
        success: true,
        data: {
          userRegistered: userRegistered[0].count,
          totalCharacters: totalCharacters[0].count,
          totalHouse: totalHouse[0].count,
          totalBusiness: totalBusiness[0].count,
          totalWorkshop: totalWorkshop[0].count,
          totalFarms: totalFarms[0].count,
        },
        error: null,
      });
      res.end();
    } catch (err: any) {
      res.status(400).json({
        success: false,
        data: null,
        error: err.message,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      data: null,
      error: "Invalid request method",
    });
    res.end();
  }
}
