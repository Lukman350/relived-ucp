import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { API_HOST, PUBLIC_URL, isTokenValid } from "@/components/Utils";
import Toast from "@/components/Toast";
import callAPI from "@/config/api";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const router = useRouter();
  let params = router.query.params || [];

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!password || !passwordConfirm) {
      Toast.error("Missing required fields");
      return;
    }

    if (password !== passwordConfirm) {
      Toast.error("Passwords do not match");
      return;
    }

    const response = await callAPI({
      url: `${API_HOST}/user/reset/password`,
      method: "POST",
      data: {
        ucpID: params[0],
        token: params[1],
        password,
      },
    });

    if (response.success) {
      Toast.success("Password reset successfully");
      router.push("/login");
    } else {
      Toast.error(response.error);
    }

    setPassword("");
    setPasswordConfirm("");
  };

  return (
    <Layout title="Relived - Forgot Page">
      <section
        className="h-100 w-100"
        style={{ boxSizing: "border-box", backgroundColor: "#141432" }}
      >
        <div
          className="content-3-6 d-flex flex-column align-items-center h-100 flex-lg-row"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <div
            className="position-relative d-none d-lg-flex flex-column justify-content-center align-items-center width-left"
            data-aos="zoom-in"
          >
            <Image
              className="img-fluid"
              src={`${PUBLIC_URL}/images/reset-hero.svg`}
              alt="Login Hero"
              quality={100}
              width={400}
              height={300}
            />
          </div>
          <div
            className="d-flex mx-auto align-items-left justify-content-left width-right mx-lg-0"
            data-aos="zoom-in-up"
          >
            <div className="right mx-lg-0 mx-auto">
              <div className="align-items-center justify-content-center d-lg-none d-flex">
                <Image
                  className="img-fluid"
                  src={`${PUBLIC_URL}/images/reset-hero.svg`}
                  alt="Login Hero"
                  width={351.75}
                  height={300.58}
                  data-aos="zoom-in"
                />
              </div>
              <h3 className="title-text mt-3">Reset Password</h3>
              <p className="caption-text">
                Input your new password and confirm it below.
              </p>
              <div style={{ marginBottom: "1.75rem" }}>
                <label htmlFor="password" className="d-block input-label">
                  New Password
                </label>

                <div className="d-flex w-100 div-input">
                  <svg
                    className="icon"
                    style={{ marginRight: "1rem" }}
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.81592 4.25974C7.12462 5.48872 7 6.95088 7 8H6C4.34315 8 3 9.34315 3 11V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V11C21 9.34315 19.6569 8 18 8L17 7.99998C17 6.95087 16.8754 5.48871 16.1841 4.25973C15.829 3.62845 15.3194 3.05012 14.6031 2.63486C13.8875 2.22005 13.021 2 12 2C10.979 2 10.1125 2.22005 9.39691 2.63486C8.68058 3.05012 8.17102 3.62845 7.81592 4.25974ZM9.55908 5.24026C9.12538 6.01128 9 7.04912 9 8H15C15 7.04911 14.8746 6.01129 14.4409 5.24027C14.2335 4.87155 13.9618 4.57488 13.6 4.36514C13.2375 4.15495 12.729 4 12 4C11.271 4 10.7625 4.15495 10.4 4.36514C10.0382 4.57488 9.76648 4.87155 9.55908 5.24026ZM14 14C14 14.7403 13.5978 15.3866 13 15.7324V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14Z"
                      fill="#4E4B62"
                    />
                  </svg>
                  <input
                    className="input-field"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <label htmlFor="confirmPass" className="d-block input-label">
                  Confirm Password
                </label>

                <div className="d-flex w-100 div-input">
                  <svg
                    className="icon"
                    style={{ marginRight: "1rem" }}
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.81592 4.25974C7.12462 5.48872 7 6.95088 7 8H6C4.34315 8 3 9.34315 3 11V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V11C21 9.34315 19.6569 8 18 8L17 7.99998C17 6.95087 16.8754 5.48871 16.1841 4.25973C15.829 3.62845 15.3194 3.05012 14.6031 2.63486C13.8875 2.22005 13.021 2 12 2C10.979 2 10.1125 2.22005 9.39691 2.63486C8.68058 3.05012 8.17102 3.62845 7.81592 4.25974ZM9.55908 5.24026C9.12538 6.01128 9 7.04912 9 8H15C15 7.04911 14.8746 6.01129 14.4409 5.24027C14.2335 4.87155 13.9618 4.57488 13.6 4.36514C13.2375 4.15495 12.729 4 12 4C11.271 4 10.7625 4.15495 10.4 4.36514C10.0382 4.57488 9.76648 4.87155 9.55908 5.24026ZM14 14C14 14.7403 13.5978 15.3866 13 15.7324V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14Z"
                      fill="#4E4B62"
                    />
                  </svg>
                  <input
                    className="input-field"
                    type="password"
                    name="confirmPass"
                    id="confirmPass"
                    placeholder="Confirm new password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
              </div>
              <br />
              <div className="content-2-3">
                <button
                  type="submit"
                  className="btn btn-fill text-white border-0 mt-3 d-block w-100"
                  onClick={handleSubmit}
                >
                  Reset Password
                </button>
                <Link href="/">
                  <a className="btn btn-outline btn-no-fill d-block w-100 mt-2">
                    Back To Home
                  </a>
                </Link>
              </div>
            </div>
          </div>
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
