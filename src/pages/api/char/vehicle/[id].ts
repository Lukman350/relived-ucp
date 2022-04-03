import { connection } from "../../../../database";

export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    const { id } = req.query;

    if (id < 1) {
      res.status(400).json({
        success: false,
        error: "Invalid owner",
      });
      res.end();
      return;
    }

    connection.execute(
      "SELECT `ID`, `Model`, `Insurance`, `EngineUpgrade`, `BodyUpgrade`, `Plate`, `Health`, `Fuel`, `Garage`, `GarageApart`, `GarageFlat`, `Impound`, `InsideInsurance` FROM `player_vehicles` WHERE ID = ? LIMIT 1",
      [id],
      (err, rows) => {
        if (err) {
          res.status(500).json({
            success: false,
            error: err.message,
          });
        } else {
          if (rows.length === 0) {
            res.status(404).json({
              success: false,
              error: "Invalid ID",
            });

            return;
          }

          res.status(200).json({
            success: true,
            data: rows,
          });
          res.end();
        }
      }
    );
  } else {
    res.status(500).json({
      success: false,
      error: "Method not allowed",
    });
    res.end();
  }
}
