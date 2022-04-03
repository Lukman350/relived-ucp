import { DisplayServerProps } from "@/data-types";

export default function DisplayServer({ data }: DisplayServerProps) {
  const server: any = data;
  return (
    <div className="text-start">
      <style jsx>
        {`
          table:hover {
            cursor: pointer;
          }

          table {
            width: 100%;
            margin: auto;
          }

          .responsive-table {
            display: block;
            height: 400px;
            max-width: 100%;
            overflow: auto;
            white-space: nowrap;
          }

          tr:hover {
            color: #ccc;
          }
        `}
      </style>
      <div className="responsive-table">
        <table
          className="table table-responsive text-white"
          style={{ backgroundColor: "#141432" }}
        >
          <tbody>
            <tr>
              <td>Status</td>
              <td>
                {!server ? (
                  <b className="text-danger">OFF</b>
                ) : (
                  <b className="text-success">ON</b>
                )}
              </td>
            </tr>
            <tr>
              <td>Hostname</td>
              <td>{server ? server.hostname : "Loading..."}</td>
            </tr>
            <tr>
              <td>IP</td>
              <td>
                {server
                  ? `samp.relivedrp.com atau ${server.address}`
                  : "Loading..."}
              </td>
            </tr>
            <tr>
              <td>Players</td>
              <td>
                {server
                  ? `${server.online} / ${server.maxplayers}`
                  : "Loading..."}
              </td>
            </tr>
            <tr>
              <td>Gamemode</td>
              <td>{server ? server.gamemode : "Loading..."}</td>
            </tr>
            <tr>
              <td>Mapname</td>
              <td>{server ? server.mapname : "Loading..."}</td>
            </tr>
            <tr>
              <td>Version</td>
              <td>{server ? server.rules.version : "Loading..."}</td>
            </tr>
            <tr>
              <td>Weburl</td>
              <td>{server ? server.rules.weburl : "Loading..."}</td>
            </tr>
            <tr>
              <td>Weather</td>
              <td>{server ? server.rules.weather : "Loading..."}</td>
            </tr>
            <tr>
              <td>Worldtime</td>
              <td>{server ? server.rules.worldtime : "Loading..."}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
