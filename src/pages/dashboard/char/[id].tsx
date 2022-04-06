import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import DisplayChar from "@/components/DisplayChar";
import callAPI from "@/config/api";
import { getAccount, API_HOST, isTokenValid } from "@/components/Utils";
import Cookies from "js-cookie";
import { CharProps } from "@/data-types";

function Char({ account, character, veh }: CharProps) {
  return (
    <Layout title="Relived - Character Details">
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
          <DisplayChar char={character} vehicle={veh} />

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
        account: {
          success: false,
          error: "Account not found",
          data: null,
        },
        character: {
          success: false,
          error: "Character not found",
          data: null,
        },
        veh: {
          success: false,
          error: "Vehicle not found",
          data: null,
        },
      },
    };
  } else {
    const account = getAccount(token);

    const character = await callAPI({
      url: `${API_HOST}/char/${id}`,
      method: "GET",
      token,
    });

    const veh = await callAPI({
      url: `${API_HOST}/char/vehicle/owner/${id}`,
      method: "GET",
      token,
    });

    if (character.success) {
      if (character.data.Username !== account.username) {
        return {
          redirect: {
            destination: "/dashboard/characters",
            permanent: false,
          },
        };
      }
    }

    return {
      props: {
        account,
        character: character.data,
        veh,
      },
    };
  }
}

export default Char;
