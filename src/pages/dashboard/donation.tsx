import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getAccount, isTokenValid } from "../../components/Utils";

export default function Donation() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    const tokenCookies = Cookies.get("token");
    if (tokenCookies) {
      setAccount(getAccount(tokenCookies));
    }
  }, []);

  return (
    <Layout title="Relived - Donation Page">
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
          <div
            className="d-flex flex-column align-items-center"
            style={{ height: "73vh" }}
          >
            <h1 className="h1">This page is under development</h1>
          </div>

          <Footer />
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
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

  return {
    props: {},
  };
}
