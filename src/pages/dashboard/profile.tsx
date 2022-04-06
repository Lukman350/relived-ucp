import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  API_HOST,
  convertTimestamp,
  getAccount,
  isTokenValid,
  getAdminLevel,
} from "@/components/Utils";
import { ProfileProps } from "@/data-types";
import Skeleton from "react-loading-skeleton";
import callAPI from "@/config/api";

export default function Profile({ account, profile }: ProfileProps) {
  return (
    <Layout title="Relived - Profile Page">
      <Navbar account={account} />
      <section
        className="h-100 w-100"
        style={{
          boxSizing: "border-box",
          backgroundColor: "#141432",
          overflow: "hidden",
        }}
      >
        <div
          className="container-xxl mx-auto p-0 position-relative header-2-3 text-white"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <div className="mx-auto d-flex flex-lg-row flex-column hero">
            <style jsx>
              {`
                table:hover {
                  cursor: pointer;
                }

                table {
                  width: 100%;
                }

                @media (min-width: 576px) {
                  table {
                    width: 500px;
                  }
                }

                @media (min-width: 768px) {
                  table {
                    width: 100%;
                  }
                }

                .responsive-table {
                  display: block;
                  height: 380px;
                  max-width: 100%;
                  overflow: auto;
                }

                tr:hover {
                  color: #ccc;
                }
              `}
            </style>
            <div className="d-flex flex-lg-grow-1 flex-column align-items-center">
              <h3
                className="h3 text-center mt-1"
                data-aos="zoom-in"
                data-aos-once="true"
              >
                Your UCP Profile
              </h3>
              <div
                className="responsive-table"
                data-aos="zoom-in-up"
                data-aos-once="true"
              >
                <table
                  className="table table-responsive text-white"
                  style={{ backgroundColor: "#141432" }}
                >
                  <tbody>
                    {profile !== null ? (
                      <>
                        <tr>
                          <td>ID</td>
                          <td>{profile.ID}</td>
                        </tr>
                        <tr>
                          <td>Username</td>
                          <td>{profile.Username}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>{profile.Email}</td>
                        </tr>
                        <tr>
                          <td>Register Date</td>
                          <td>{convertTimestamp(profile.RegisterDate)}</td>
                        </tr>
                        <tr>
                          <td>Admin</td>
                          <td>{getAdminLevel(profile.Admin)}</td>
                        </tr>
                        <tr>
                          <td>IP</td>
                          <td>{profile.IP}</td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center" }}>
                            <Skeleton width="100%" height={20} />
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </section>
    </Layout>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    if (!isTokenValid(token)) {
      Cookies.remove("token");
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }

  const account = await getAccount(token);

  const profile = await callAPI({
    url: `${API_HOST}/user/profile`,
    method: "POST",
    data: {
      ucp: account.username,
    },
    token,
  });

  return {
    props: {
      account,
      profile: profile.data,
    },
  };
}
