import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import callAPI from "@/config/api";

import Toast from "@/components/Toast";
import {
  PUBLIC_URL,
  setDisabled,
  API_HOST,
  isTokenValid,
} from "@/components/Utils";

export default function LoginPage() {
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const token: string = Cookies.get("token") || "";
    if (isTokenValid(token)) {
      router.push("/dashboard");
    }
  }, [router]);

  const togglePassword = () => {
    let x: any = document.getElementById("password-content-3-6");
    let iconToggle: any = document.getElementById("icon-toggle");
    if (x.type === "password") {
      x.type = "text";
      iconToggle.setAttribute("fill", "#524eee");
    } else {
      x.type = "password";
      iconToggle.setAttribute("fill", "#4E4B62");
    }
  };

  const handlerLogin = async (e: any) => {
    e.preventDefault();
    setDisabled(e.target, true);

    if (!account || !password) {
      setDisabled(e.target, false);
      Toast.error("Please fill in all fields");
      return;
    }

    const res = await callAPI({
      url: `${API_HOST}/login`,
      method: "POST",
      data: {
        ucp: account,
        password,
      },
    });

    if (res.success) {
      const { token } = res.data;
      Cookies.set("token", token, { expires: 1 });
      Toast.success("Login Success");

      router.push("/dashboard/");
    } else {
      setDisabled(e.target, false);
      Toast.error(res.error);
    }

    setDisabled(e.target, false);
  };

  return (
    <>
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
              src={`${PUBLIC_URL}/images/login-hero.png`}
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
                  src={`${PUBLIC_URL}/images/login-hero.png`}
                  alt="Login Hero"
                  width={351.75}
                  height={300.58}
                  data-aos="zoom-in"
                />
              </div>
              <h3 className="title-text">Log In to continue</h3>
              <p className="caption-text">
                Please log in using that account has
                <br />
                registered on Game.
              </p>
              <div style={{ marginBottom: "1.75rem" }}>
                <label htmlFor="" className="d-block input-label">
                  UCP or Email Address
                </label>
                <div className="d-flex w-100 div-input">
                  <svg
                    className="icon"
                    style={{ marginRight: "1rem" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"
                      fill="#4E4B62"
                    />
                  </svg>
                  <input
                    className="input-field"
                    type="text"
                    name="account"
                    id="account"
                    placeholder="Your UCP or Email Address"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <label htmlFor="" className="d-block input-label">
                  Password
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
                    id="password-content-3-6"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* toggle password */}
                  <div onClick={() => togglePassword()}>
                    <svg
                      style={{ marginLeft: "0.75rem", cursor: "pointer" }}
                      width={20}
                      height={14}
                      viewBox="0 0 20 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        id="icon-toggle"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 7C0.555556 4.66667 3.33333 0 10 0C16.6667 0 19.4444 4.66667 20 7C19.4444 9.52778 16.6667 14 10 14C3.31853 14 0.555556 9.13889 0 7ZM10 5C8.89543 5 8 5.89543 8 7C8 8.10457 8.89543 9 10 9C11.1046 9 12 8.10457 12 7C12 6.90536 11.9934 6.81226 11.9807 6.72113C12.2792 6.89828 12.6277 7 13 7C13.3608 7 13.6993 6.90447 13.9915 6.73732C13.9971 6.82415 14 6.91174 14 7C14 9.20914 12.2091 11 10 11C7.79086 11 6 9.20914 6 7C6 4.79086 7.79086 3 10 3C10.6389 3 11.2428 3.14979 11.7786 3.41618C11.305 3.78193 11 4.35535 11 5C11 5.09464 11.0066 5.18773 11.0193 5.27887C10.7208 5.10171 10.3723 5 10 5Z"
                        fill="#4E4B62"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-end"
                style={{ marginTop: "0.75rem" }}
              >
                <Link href="/forgot" scroll={false}>
                  <a className="forgot-password fst-italic">Forgot Password?</a>
                </Link>
              </div>
              <br />
              <div className="content-2-3">
                <button
                  className="btn btn-fill text-white border-0 d-block w-100"
                  type="button"
                  onClick={(e) => handlerLogin(e)}
                >
                  Log In To My Account
                </button>
                <Link href="/">
                  <a className="btn btn-outline btn-no-fill d-block w-100 mt-3">
                    Back To Home
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
