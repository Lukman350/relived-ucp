import { DisplayPlayersProps, PlayerTypes } from "@/data-types";
import Skeleton from "react-loading-skeleton";

export default function Players({ data }: DisplayPlayersProps) {
  return (
    <div className="text-left">
      <style jsx>
        {`
          table:hover {
            cursor: pointer;
          }

          table {
            border-collapse: collapse;
            width: 100%;
          }

          .responsive-table {
            display: block;
            height: 400px;
            max-width: 100%;
            overflow-x: auto;
            overflow-y: auto;
            white-space: nowrap;
          }

          tr:hover {
            color: #ccc;
          }
        `}
      </style>
      <h3
        className="h3 text-center m-3"
        data-aos="zoom-in"
        data-aos-once="true"
      >
        Server Status
      </h3>
      <h5 className="h5" data-aos="zoom-in" data-aos-once="true">
        Status:{" "}
        {data === null ? (
          <b className="text-danger">OFF</b>
        ) : (
          <b className="text-success">ON</b>
        )}
      </h5>
      <h5 className="h5" data-aos="zoom-in" data-aos-once="true">
        Players: {data !== null && `${data.online} / ${data.maxplayers}`}
      </h5>
      <div
        className="responsive-table"
        data-aos="zoom-in-up"
        data-aos-once="true"
      >
        <table
          className="table table-responsive text-white"
          style={{ backgroundColor: "#141432" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Level</th>
              <th>Ping</th>
            </tr>
          </thead>
          <tbody>
            {data !== null ? (
              data.players.map((player: PlayerTypes) => (
                <tr key={player.id}>
                  <td>{player.id}</td>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                  <td>{player.ping}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>
                  <Skeleton />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
