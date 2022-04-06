import Layout from "@/components/Layout";
import Landing from "@/components/Home";
import { HomeProps } from "@/data-types";
import callAPI from "@/config/api";
import { API_HOST } from "@/components/Utils";
import { InferGetStaticPropsType } from "next";

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Relived Community">
      <Landing data={data} />
    </Layout>
  );
}

export async function getStaticProps() {
  const response = await callAPI({
    url: `${API_HOST}/server/players`,
    method: "GET",
  });

  if (!response) {
    return {
      notFound: true,
    };
  }

  const data: HomeProps = response.data;

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}
