import { getVehicleName, getVehicleHealth } from "../Utils";
import { useRouter } from "next/router";
import Image from "next/image";
import { PUBLIC_URL } from "../Utils";
import { DisplayVehicleProps, VehicleDataTypes } from "@/data-types";

export default function DisplayVehicle({ vehicle }: DisplayVehicleProps) {
  const router = useRouter();
  return (
    <div className="mx-auto d-flex flex-lg-row flex-column hero">
      <style jsx>
        {`
          table:hover {
            cursor: pointer;
          }
          table {
            width: 400px;
          }

          .responsive-table {
            display: block;
            height: 500px;
            max-width: 100%;
            overflow-x: auto;
            overflow-y: auto;
          }

          tr:hover {
            color: #ccc;
          }
        `}
      </style>
      {/* Left Column */}
      <div className="left-column d-flex flex-lg-grow-1 flex-column text-lg-start align-items-center">
        {vehicle !== undefined ? (
          vehicle.data.map((veh: VehicleDataTypes) => {
            return (
              <div key={veh.ID}>
                <h3 className="h3 text-center m-3">
                  {getVehicleName(veh.Model)}
                </h3>
                <Image
                  src={`${PUBLIC_URL}/images/vehicles/${veh.Model}.png`}
                  alt={getVehicleName(veh.Model)}
                  className="img-fluid"
                  quality={100}
                  width={186}
                  height={137}
                />
                <p className="mt-5" style={{ fontSize: "0.70em" }}>
                  <em>Source: http://weedarr.wikidot.com/veh</em>
                </p>
              </div>
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
      {/* Right Column */}
      <div className="right-column d-flex flex-lg-grow-1 flex-column text-lg-start align-items-center">
        <div className="responsive-table">
          <table
            className="table table-responsive text-white"
            style={{ backgroundColor: "#141432" }}
          >
            <tbody>
              {vehicle !== undefined ? (
                vehicle.data.map((veh: VehicleDataTypes) => {
                  const vehicleName = getVehicleName(veh.Model);
                  const getVehicleState = (v: VehicleDataTypes) => {
                    if (v.Garage || v.GarageApart || v.GarageFlat) {
                      return "In Garage";
                    } else if (v.Impound !== -1) {
                      return "In Impound";
                    } else if (v.InsideInsurance) {
                      return "In Insurance Center";
                    } else {
                      return "Spawned";
                    }
                  };

                  return (
                    <>
                      <tr style={{ verticalAlign: "text-top" }}>
                        <td>ID</td>
                        <td>{veh.ID}</td>
                      </tr>
                      <tr style={{ verticalAlign: "text-top" }}>
                        <td>Name</td>
                        <td>{vehicleName}</td>
                      </tr>
                      <tr style={{ verticalAlign: "text-top" }}>
                        <td>Model</td>
                        <td>{veh.Model}</td>
                      </tr>
                      <tr style={{ verticalAlign: "text-top" }}>
                        <td>Insurance</td>
                        <td>{veh.Insurance}</td>
                      </tr>
                      <tr style={{ verticalAlign: "text-top" }}>
                        <td>Upgrades</td>
                        <td>
                          {veh.EngineUpgrade == 1 && veh.BodyUpgrade == 0
                            ? "Engine"
                            : veh.BodyUpgrade == 1 && veh.EngineUpgrade == 0
                            ? "Body"
                            : veh.BodyUpgrade && veh.EngineUpgrade
                            ? "Engine & Body"
                            : "None"}
                        </td>
                      </tr>
                      <tr style={{ verticalAlign: "text-top" }}>
                        <td>Plate</td>
                        <td>{veh.Plate}</td>
                      </tr>
                      <tr style={{ verticalAlign: "text-top" }}>
                        <td>Health</td>
                        <td>{getVehicleHealth(veh.Health)}</td>
                      </tr>
                      <tr style={{ verticalAlign: "text-top" }}>
                        <td>Fuel</td>
                        <td>
                          <div className="progress">
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated"
                              role="progressbar"
                              aria-valuenow={veh.Fuel}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: `${veh.Fuel}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                      <tr style={{ verticalAlign: "text-top" }}>
                        <td>State</td>
                        <td>{getVehicleState(veh)}</td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10}>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>

          <a
            className="btn btn-fill text-white p-2 mx-2"
            style={{ fontSize: "1rem" }}
            href="#"
            onClick={() => router.back()}
          >
            Go back
          </a>
        </div>
      </div>
    </div>
  );
}
