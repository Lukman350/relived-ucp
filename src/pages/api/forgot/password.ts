import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "@/database";
import sendEmail from "@/config/email";
import { PUBLIC_URL } from "@/components/Utils";
import type { ApiResponseData } from "@/data-types";

const randomToken = (length: number) => {
  let result: string = "";
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength: number = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const isTokenExists = async (ucpID: number) => {
  const [rows]: Array<any> = await connection
    .promise()
    .execute("SELECT `ID` FROM `forgot_request` WHERE `ucpID` = ?", [ucpID]);

  return rows.length > 0;
};

const updateRequestToken = async (ucpID: number, token: string) => {
  const [update]: Array<any> = await connection
    .promise()
    .execute(
      "UPDATE `forgot_request` SET `token` = ?, `updated` = UNIX_TIMESTAMP() WHERE `ucpID` = ?",
      [token, ucpID]
    );

  return update.affectedRows > 0;
};

const insertToken = async (ucpID: number, token: string) => {
  const [insert]: Array<any> = await connection
    .promise()
    .execute(
      "INSERT INTO `forgot_request` (`ucpID`, `token`, `type`, `created`, `updated`) VALUES (?, ?, 'reset password', UNIX_TIMESTAMP(), UNIX_TIMESTAMP())",
      [ucpID, token]
    );
  return insert.affectedRows > 0;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  const { method } = req;

  if (method === "POST") {
    const { ucp, email } = req.body;

    if (!ucp || !email) {
      res.status(400).json({
        success: false,
        error: "Missing required fields",
        data: null,
      });
      res.end();

      return;
    }

    const [rows]: Array<any> = await connection
      .promise()
      .execute(
        "SELECT `ID`, `Username` FROM `accounts` WHERE `Username` = ? AND `Email` = ? LIMIT 1",
        [ucp, email]
      );

    if (rows.length === 0) {
      res.status(400).json({
        success: false,
        error: "Invalid username or email",
        data: null,
      });
      res.end();

      return;
    }

    const { ID, Username } = rows[0];

    const token: string = randomToken(32);

    const html: string = `
      <table>
        <thead style='background-color: red; color: white'>
          <tr>
            <th>
              <h1 style='color: white;'>Relived Roleplay</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style='color: black; margin: 10px'>
                <p>Untuk: <b>${Username}</b></p>
                <p>Klik link berikut untuk mereset password Anda:</p>
                <p>
                  <a href='${PUBLIC_URL}/reset/password/${ID}/${token}'>
                    ${PUBLIC_URL}/reset/password/${ID}/${token}
                  </a>
                </p>

                <p>
                  Jika Anda tidak merasa meminta reset password, silahkan abaikan email ini.
                </p>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div style='color: #8e8e8e; text-align: center; font-size: 1em'>
                Copyright &copy; ${new Date().getFullYear()} Relived Roleplay. All rights reserved.
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    `;

    const tokenExists = await isTokenExists(ID);
    if (tokenExists) {
      await sendEmail(email, "RRP - Password Reset", html)
        .then(() => {
          const updateToken: Promise<boolean> = updateRequestToken(ID, token);

          updateToken
            .then((result) => {
              if (result) {
                res.status(200).json({
                  success: true,
                  error: "Email sent",
                  data: null,
                });
                res.end();
              } else {
                res.status(500).json({
                  success: false,
                  error: "Failed to update token",
                  data: null,
                });
                res.end();
              }
            })
            .catch((err) => {
              res.status(500).json({
                success: false,
                error: err,
                data: null,
              });
              res.end();
            });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            error: err,
            data: null,
          });
          res.end();
        });
    } else {
      await sendEmail(email, "RRP - Password Reset", html)
        .then(() => {
          const tokenInserted = insertToken(ID, token);

          if (!tokenInserted) {
            res.status(500).json({
              success: false,
              error: "Failed to create forgot request",
              data: null,
            });
            res.end();

            return;
          }

          res.status(200).json({
            success: true,
            error: "Email sent",
            data: null,
          });
          res.end();
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            error: err,
            data: null,
          });
          res.end();
        });
    }
  } else {
    res.status(404);
    res.end();
  }
}
