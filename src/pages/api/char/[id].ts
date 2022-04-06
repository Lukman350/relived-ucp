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
    if (!req.query.id) {
      res.status(400).json({
        success: false,
        error: "Missing id",
        data: null,
      });

      return;
    }

    const [char]: Array<any> = await connection
      .promise()
      .execute(
        "SELECT `Username`, `ID`, `Origin`, `Gender`, `Skin`, `pScore`, `Played`, `Money`, `BankMoney`, `LoginDate`, `Birthdate`, `Character`, `Phone`, `Rekening`, `Warnings`, `Gold`, `Vip`, `VipTime`, `Story`, `Married`, `CoupleName`, `Health`, `ArmorStatus`, `MaxHealth` FROM `characters` WHERE `ID` = ? LIMIT 1",
        [req.query.id]
      );

    if (char.length === 0) {
      res.status(404).json({
        success: false,
        error: "Character not found",
        data: null,
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: char[0],
      error: null,
    });
  } else {
    res.status(400).json({
      success: false,
      data: null,
      error: "Missing required fields",
    });

    return;
  }
});

export const config = {
  api: {
    externalResolver: true,
  },
};
