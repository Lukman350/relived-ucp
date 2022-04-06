import { formatNum } from "@/components/Utils";
import { ServerStatisticProps } from "@/data-types";
import Skeleton from "react-loading-skeleton";

export default function ServerStatistic({ stats }: ServerStatisticProps) {
  return (
    <div>
      <style jsx>
        {`
          .card {
            background-color: #292952;
            border-radius: 0.75rem;
            border: 1px solid #4c4c6d;
            color: white;
          }
        `}
      </style>
      <h3
        className="h3 text-center m-3"
        data-aos="zoom-in"
        data-aos-once="true"
      >
        Server Statistics
      </h3>

      <div className="container text-dark">
        <div className="row mb-2" data-aos="zoom-in-up" data-aos-once="true">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <div className="p-2">
                    <i className="fas fa-users fa-3x"></i>
                  </div>
                  <div className="p-2">
                    <h5 className="card-title fw-bold">
                      {stats !== null ? (
                        "Users Registered"
                      ) : (
                        <Skeleton width="100%" />
                      )}
                    </h5>
                    <p className="card-text">
                      {stats !== null ? (
                        formatNum(stats.userRegistered)
                      ) : (
                        <Skeleton width="100%" />
                      )}
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
                      {stats !== null ? (
                        "Total Character"
                      ) : (
                        <Skeleton width="100%" />
                      )}
                    </h5>
                    <p className="card-text">
                      {stats !== null ? (
                        formatNum(stats.totalCharacters)
                      ) : (
                        <Skeleton width="100%" />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-2" data-aos="zoom-in-up" data-aos-once="true">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <div className="p-2">
                    <i className="fa-solid fa-house-chimney fa-3x"></i>
                  </div>
                  <div className="p-2">
                    <h5 className="card-title fw-bold">
                      {stats !== null ? (
                        "Total House"
                      ) : (
                        <Skeleton width="100%" />
                      )}
                    </h5>
                    <p className="card-text">
                      {stats !== null ? (
                        formatNum(stats.totalHouse)
                      ) : (
                        <Skeleton width="100%" />
                      )}
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
                      {stats !== null ? (
                        "Total Business"
                      ) : (
                        <Skeleton width="100%" />
                      )}
                    </h5>
                    <p className="card-text">
                      {stats !== null ? (
                        formatNum(stats.totalBusiness)
                      ) : (
                        <Skeleton width="100%" />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" data-aos="zoom-in-up" data-aos-once="true">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <div className="p-2">
                    <i className="fa-solid fa-car fa-3x"></i>
                  </div>
                  <div className="p-2">
                    <h5 className="card-title fw-bold">
                      {stats !== null ? (
                        "Total Workshop"
                      ) : (
                        <Skeleton width="100%" />
                      )}
                    </h5>
                    <p className="card-text">
                      {stats !== null ? (
                        formatNum(stats.totalWorkshop)
                      ) : (
                        <Skeleton width="100%" />
                      )}
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
                      {stats !== null ? (
                        "Total Farm"
                      ) : (
                        <Skeleton width="100%" />
                      )}
                    </h5>
                    <p className="card-text">
                      {stats !== null ? (
                        formatNum(stats.totalFarms)
                      ) : (
                        <Skeleton width="100%" />
                      )}
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
