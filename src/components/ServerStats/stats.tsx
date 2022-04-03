import { formatNum } from "@/components/Utils";
import { ServerStatisticProps } from "@/data-types";

export default function ServerStatistic({ stats }: ServerStatisticProps) {
  return (
    <div>
      <h3 className="h3 text-center m-3">Server Statistics</h3>

      <div className="container text-dark">
        <div className="row mb-2">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <div className="p-2">
                    <i className="fas fa-users fa-3x"></i>
                  </div>
                  <div className="p-2">
                    <h5 className="card-title fw-bold">
                      {stats !== undefined ? "Users Registered" : "Loading..."}
                    </h5>
                    <p className="card-text">
                      {stats !== undefined
                        ? formatNum(stats.userRegistered)
                        : "Loading..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <div className="p-2">
                    <i className="fas fa-user-friends fa-3x"></i>
                  </div>
                  <div className="p-2">
                    <h5 className="card-title fw-bold">
                      {stats !== undefined ? "Total Character" : "Loading..."}
                    </h5>
                    <p className="card-text">
                      {stats !== undefined
                        ? formatNum(stats.totalCharacters)
                        : "Loading..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <div className="p-2">
                    <i className="fa-solid fa-house-chimney fa-3x"></i>
                  </div>
                  <div className="p-2">
                    <h5 className="card-title fw-bold">
                      {stats !== undefined ? "Total House" : "Loading..."}
                    </h5>
                    <p className="card-text">
                      {stats !== undefined
                        ? formatNum(stats.totalHouse)
                        : "Loading..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <div className="p-2">
                    <i className="fa-solid fa-city fa-3x"></i>
                  </div>
                  <div className="p-2">
                    <h5 className="card-title fw-bold">
                      {stats !== undefined ? "Total Business" : "Loading..."}
                    </h5>
                    <p className="card-text">
                      {stats !== undefined
                        ? formatNum(stats.totalBusiness)
                        : "Loading..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <div className="p-2">
                    <i className="fa-solid fa-car fa-3x"></i>
                  </div>
                  <div className="p-2">
                    <h5 className="card-title fw-bold">
                      {stats !== undefined ? "Total Workshop" : "Loading..."}
                    </h5>
                    <p className="card-text">
                      {stats !== undefined
                        ? formatNum(stats.totalWorkshop)
                        : "Loading..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <div className="p-2">
                    <i className="fa-solid fa-building-wheat fa-3x"></i>
                  </div>
                  <div className="p-2">
                    <h5 className="card-title fw-bold">
                      {stats !== undefined ? "Total Farm" : "Loading..."}
                    </h5>
                    <p className="card-text">
                      {stats !== undefined
                        ? formatNum(stats.totalFarms)
                        : "Loading..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
