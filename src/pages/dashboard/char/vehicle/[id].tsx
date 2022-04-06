import { useRouter } from "next/router";
import Layout from "../../../../components/Layout";
import { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import DisplayVehicle from "../../../../components/DisplayVehicle";
import callAPI from "../../../../config/api";
import {
  getAccount,
  isTokenValid,
  API_HOST,
} from "../../../../components/Utils";
import Cookies from "js-cookie";
import { VehicleProps } from "@/data-types";

export default function Vehicle({ account, id }: VehicleProps) {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (id.success === false) {
        setError(id.error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Layout title="Relived - Player Vehicles">
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
          {!error ? (
            <DisplayVehicle vehicle={id} />
          ) : (
            <div
              className="d-flex flex-column align-items-center"
              style={{ height: "73vh" }}
              data-aos="zoom-in"
              data-aos-once="true"
            >
              <h3>
                <span role="img" aria-label="Sad Face">
                  😢
                </span>{" "}
                {error}
              </h3>
            </div>
          )}

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
  params: {
    id: string;
  };
}

export async function getServerSideProps({ req, params }: GetServerSideProps) {
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

  const { id } = params;

  if (parseInt(id) < 1) {
    return {
      props: {
        id: {
          success: false,
          error: "Invalid owner",
          data: null,
        },
      },
    };
  } else {
    const account = await getAccount(token);

    const response = await callAPI({
      url: `${API_HOST}/char/vehicle/${id}`,
      method: "GET",
      token,
    });

    return {
      props: {
        account,
        id: response,
      },
    };
  }
}
