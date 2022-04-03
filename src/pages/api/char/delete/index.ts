import { connection } from "@/database";
import type { ApiResponseData, JWTPayloadTypes, UserTypes } from "@/data-types";
import type { NextApiRequest, NextApiResponse } from "next";
import jwtDecode from "jwt-decode";

const deleteInventory = (id: number) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `DELETE FROM inventory WHERE ID = ?`,
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deleteContacts = (id: number) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `DELETE FROM contacts WHERE ID = ?`,
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deleteGPS = (id: number) => {
  return new Promise((resolve, reject) => {
    connection.execute(`DELETE FROM gps WHERE id = ?`, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const deleteVehicles = (id: number) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `DELETE FROM player_vehicles WHERE Owner = ?`,
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deleteWarrants = (id: number) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `DELETE FROM warrants WHERE Suspect = ?`,
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deleteTickets = (id: number) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `DELETE FROM tickets WHERE ID = ?`,
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  const { method } = req;

  if (method === "POST") {
    const { id } = req.body;
    const token = req.headers.authorization
      ? req.headers.authorization.replace("Bearer ", "")
      : null;

    if (!token || !id) {
      res.status(400).json({
        success: false,
        data: null,
        error: "Missing required fields",
      });
      res.end();
      return;
    }

    const decoded: JWTPayloadTypes = jwtDecode(token);

    const { username }: UserTypes = decoded.user;
    const [ucp]: Array<any> = await connection
      .promise()
      .execute("SELECT `Username` FROM characters WHERE ID = ?", [id]);

    if (ucp.length === 0) {
      res.status(400).json({
        success: false,
        data: null,
        error: "Character not found",
      });
      res.end();
      return;
    }

    if (username !== ucp[0].Username) {
      res.status(400).json({
        success: false,
        data: null,
        error: "You do not have permission to delete this character",
      });
      res.end();
      return;
    }

    const [deleted]: Array<any> = await connection
      .promise()
      .execute("DELETE FROM characters WHERE ID = ?", [id]);

    if (deleted.affectedRows === 0) {
      res.status(404).json({
        success: false,
        data: null,
        error: "User not found",
      });
      res.end();
      return;
    }

    const promises = [
      deleteInventory(id),
      deleteContacts(id),
      deleteGPS(id),
      deleteVehicles(id),
      deleteWarrants(id),
      deleteTickets(id),
    ];

    Promise.all(promises)
      .then(() => {
        res.status(200).json({
          success: true,
          data: deleted,
          error: null,
        });
        res.end();
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          data: null,
          error: err,
        });
        res.end();
      });
  } else {
    res.status(400).json({
      success: false,
      data: null,
      error: "Wrong method",
    });
    res.end();
    return;
  }
}
