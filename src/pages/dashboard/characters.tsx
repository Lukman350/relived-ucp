import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { API_HOST, getAccount, isTokenValid } from "@/components/Utils";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import callAPI from "@/config/api";
import Footer from "@/components/Footer";
import Swal from "sweetalert2";
import { CharactersProps, CharTypes } from "@/data-types";
import Skeleton from "react-loading-skeleton";
import { ApiResponseData } from "@/data-types";

export default function Characters({ account, ucp }: CharactersProps) {
  const router = useRouter();

  const deleteChar = async (charid: number) => {
    Swal.fire({
      title: "Delete Character",
      text: `Are you sure? Want to delete character ID ${charid}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const token = Cookies.get("token");

        if (token) {
          const res = await callAPI({
            url: `${API_HOST}/char/delete`,
            method: "POST",
            data: {
              id: charid,
            },
            token,
          });

          if (res.success === false) {
            Swal.showValidationMessage(`Request failed: ${res.error}`);
          }
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your character has been deleted.",
          icon: "success",
        });

        router.prefetch("/dashboard/characters");
      }
    });
  };

  return (
    <Layout title="Relived - My Characters">
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
                Your Characters
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
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Character</th>
                      <th>Level</th>
                      <th>Gender</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ucp.success === true ? (
                      ucp.data.map((char: CharTypes) => (
                        <tr
                          key={char.ID}
                          style={{
                            verticalAlign: "text-top",
                          }}
                        >
                          <td>{`#${char.ID}`}</td>
                          <td>
                            {char.Character.split("_")[0] +
                              " " +
                              char.Character.split("_")[1]}
                          </td>
                          <td>{char.pScore}</td>
                          <td>{char.Gender === 1 ? "Male" : "Female"}</td>
                          <td>
                            <Link
                              href="/dashboard/char/[id]"
                              as={`/dashboard/char/${char.ID}`}
                            >
                              <a
                                className="btn btn-fill text-white p-2 mx-2"
                                style={{ fontSize: "1rem" }}
                              >
                                Details
                              </a>
                            </Link>
                            <a
                              className="btn btn-outline btn-no-fill p-2 mx-2"
                              href="#"
                              style={{ fontSize: "1rem" }}
                              onClick={() => deleteChar(char.ID)}
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center" }}>
                            <Skeleton width="100%" height={20} />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center" }}>
                            <Skeleton width="100%" height={20} />
                          </td>
                        </tr>
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

  const res = await callAPI({
    url: `${API_HOST}/getchar`,
    method: "POST",
    data: {
      all: true,
      ucp: account.username,
    },
    token,
  });

  return {
    props: {
      account,
      ucp: res,
    },
  };
}
