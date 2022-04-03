import Layout from "@/components/Layout";
import LoginPage from "@/components/LoginPage";
import { isTokenValid } from "@/components/Utils";

export default function Login() {
  return (
    <Layout title="Relived - Login Page">
      <LoginPage />
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

  return {
    props: {},
  };
}
