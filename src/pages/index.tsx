import Layout from "@/components/Layout";
import Landing from "@/components/Home";
import { HomeProps } from "@/data-types";
import callAPI from "@/config/api";
import { API_HOST, isTokenValid } from "@/components/Utils";

export default function Home({ data }: HomeProps) {
  return (
    <Layout title="Relived Community">
      <Landing data={data} />
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

  if (isTokenValid(token)) {
    return {
      props: {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      },
    };
  }

  const response = await callAPI({
    url: `${API_HOST}/server/players`,
    method: "GET",
  });

  return {
    props: {
      data: response.data.data,
    },
  };
}
