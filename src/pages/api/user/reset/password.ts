import { connection } from "../../../../database";
import { sha256 } from "js-sha256";
import { randomString } from "../../../../components/Utils";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { ucpID, token, password } = req.body;

    if (!ucpID || !token || !password) {
      res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
      res.end();

      return;
    }

    const [rows] = await connection
      .promise()
      .execute(
        "SELECT `ID`, `updated` FROM `forgot_request` WHERE `token` = ? AND `ucpID` = ? LIMIT 1",
        [token, ucpID]
      );

    if (rows.length === 0) {
      res.status(400).json({
        success: false,
        error: "Invalid token",
      });
      res.end();

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
        error: "Token expired",
      });
      res.end();

      return;
    }

    const newSalt = randomString(64);

    const newHash = sha256(password + newSalt)
      .toString()
      .toUpperCase();

    const [update] = await connection
      .promise()
      .execute(
        "UPDATE `accounts` SET `Password` = ?, `Salt` = ? WHERE `ID` = ?",
        [newHash, newSalt, ucpID]
      );

    if (update.affectedRows === 0) {
      res.status(500).json({
        success: false,
        error: "Failed to update password",
      });
      res.end();

      return;
    }

    await connection
      .promise()
      .execute("DELETE FROM `forgot_request` WHERE `ID` = ?", [ID]);

    res.status(200).json({
      success: true,
    });
    res.end();
  } else {
    res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
    res.end();
  }
}
