import {
  convertTimestamp,
  formatNumber,
  getVipType,
  getVehicleName,
  PUBLIC_URL,
} from "../Utils";
import Link from "next/link";
import Image from "next/image";
import { DisplayCharProps, VehicleDataLess } from "@/data-types";

export default function DisplayChar({ char, vehicle }: DisplayCharProps) {
  return (
    <div className="mx-auto d-flex flex-lg-row flex-column hero">
      <style jsx>
        {`
          table:hover {
            cursor: pointer;
          }

          table {
            width: 450px;
          }

          .responsive-table {
            display: block;
            height: 530px;
            max-width: 100%;
            overflow: auto;
          }

          tr:hover {
            color: #ccc;
          }
        `}
      </style>
      {/* Left Column */}
      <div className="left-column d-flex flex-lg-grow-1 flex-column text-lg-start align-items-center">
        <h3 className="h3 text-center m-3">
          {char.Character
            ? `${char.Character.split("_")[0]} ${
                char.Character.split("_")[1]
              } #${char.ID}`
            : ""}
        </h3>
        <Image
          src={`${PUBLIC_URL}/images/skins/${char.Skin}.png`}
          alt={char.Character}
          quality={100}
          className="img-fluid"
          width={186}
          height={526}
        />
      </div>
      {/* Right Column */}
      <div className="right-column d-flex flex-lg-grow-1 flex-column text-lg-start align-items-center">
        <h3 className="h3 text-center m-3">Statistics</h3>
        <div className="responsive-table">
          <table
            className="table table-responsive text-white"
            style={{ backgroundColor: "#141432" }}
          >
            <tbody>
              {char !== undefined ? (
                <>
                  <tr>
                    <td>Level</td>
                    <td>{char.pScore}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{char.Gender === 1 ? "Male" : "Female"}</td>
                  </tr>
                  <tr>
                    <td>Origin</td>
                    <td>{char.Origin}</td>
                  </tr>
                  <tr>
                    <td>Birthdate</td>
                    <td>{char.Birthdate}</td>
                  </tr>
                  <tr>
                    <td>Money</td>
                    <td>{formatNumber(char.Money)}</td>
                  </tr>
                  <tr>
                    <td>Bank Money</td>
                    <td>{formatNumber(char.BankMoney)}</td>
                  </tr>
                  <tr>
                    <td>Last Login</td>
                    <td>
                      {char.LoginDate < 1
                        ? "Never"
                        : convertTimestamp(char.LoginDate)}
                    </td>
                  </tr>
                  <tr>
                    <td>Time Played</td>
                    <td>
                      {char.Played
                        ? `${char.Played.split("|")[2]} hours, ${
                            char.Played.split("|")[1]
                          } minutes, ${char.Played.split("|")[0]} seconds`
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <td>Phone number</td>
                    <td>{char.Phone}</td>
                  </tr>
                  <tr>
                    <td>No. Rekening</td>
                    <td>{char.Rekening}</td>
                  </tr>
                  <tr>
                    <td>Warnings</td>
                    <td>{`${char.Warnings}/20`}</td>
                  </tr>
                  <tr>
                    <td>Gold</td>
                    <td>{char.Gold}</td>
                  </tr>
                  <tr>
                    <td>Vip</td>
                    <td>{getVipType(char.Vip)}</td>
                  </tr>
                  <tr>
                    <td>Vip Expired</td>
                    <td>
                      {char.VipTime > 1
                        ? convertTimestamp(char.VipTime)
                        : "None"}
                    </td>
                  </tr>
                  <tr>
                    <td>Character Story</td>
                    <td>
                      {char.Story === 0 ? (
                        <b className="text-danger">None</b>
                      ) : (
                        <b className="text-success">Accepted</b>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Married</td>
                    <td>
                      {char.Married === 0 ? (
                        "None"
                      ) : (
                        <p>
                          Married with{" "}
                          <span className="text-warning">
                            {char.CoupleName}
                          </span>
                        </p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Health</td>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                          role="progressbar"
                          aria-valuenow={char.Health}
                          aria-valuemin={0}
                          aria-valuemax={char.MaxHealth}
                          style={{ width: `${char.Health}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Armour</td>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role={"progressbar"}
                          aria-valuenow={char.ArmourStatus}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: `${char.ArmourStatus}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Vehicle List */}
          <h4 className="h4 text-center mt-3">Vehicle List</h4>
          <div className="mt-3">
            <table
              className="table table-responsive text-white"
              style={{ backgroundColor: "#141432" }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vehicle.success === true ? (
                  vehicle.data.map((veh: VehicleDataLess) => {
                    const vehicleName = getVehicleName(veh.Model);

                    return (
                      <>
                        <tr key={veh.ID} style={{ verticalAlign: "text-top" }}>
                          <td>{veh.ID}</td>
                          <td>{vehicleName}</td>
                          <td>
                            <Link href={`/dashboard/char/vehicle/${veh.ID}`}>
                              <a
                                className="btn btn-fill text-white p-2 mx-2"
                                style={{ fontSize: "1rem" }}
                              >
                                Details
                              </a>
                            </Link>
                          </td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3}>{vehicle.error}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
