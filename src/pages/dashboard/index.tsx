import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Players from "@/components/ServerStats";
import ServerStatistic from "@/components/ServerStats/stats";
import { API_HOST, getAccount, isTokenValid } from "@/components/Utils";
import Cookies from "js-cookie";
import callAPI from "@/config/api";
import { DashboardIndexProps } from "@/data-types";

export default function Index({
  account,
  players,
  stats,
}: DashboardIndexProps) {
  return (
    <Layout title="Relived - Dashboard Page">
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
            {/* Left Column */}
            <div className="left-column d-flex flex-lg-grow-1 flex-column align-items-lg-start text-lg-start align-items-center">
              <Players data={players} />
            </div>
            {/* Right Column */}
            <div className="right-column d-flex flex-lg-grow-1 flex-column align-items-lg-start text-lg-start align-items-center">
              <ServerStatistic stats={stats} />
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
  const players = await callAPI({
    url: `${API_HOST}/server/players`,
    method: "GET",
    token: true,
  });

  const stats = await callAPI({
    url: `${API_HOST}/server/stats`,
    method: "GET",
    token: true,
  });

  return {
    props: {
      account: getAccount(token),
      players: players.data,
      stats: stats.data,
    },
  };
}
