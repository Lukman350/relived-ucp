import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  PUBLIC_URL,
  API_HOST,
  isValidEmail,
  setDisabled,
} from "@/components/Utils";
import callAPI from "@/config/api";
import Toast from "@/components/Toast";

export default function Forgot() {
  const [ucp, setUCP] = useState("");
  const [email, setEmail] = useState("");

  const resetPassword = async (e: any) => {
    setDisabled(e.target, true);
    e.preventDefault();

    if (!email || !ucp) {
      Toast.error("Please fill all the fields");
      setDisabled(e.target, false);
      return;
    }

    if (!isValidEmail(email)) {
      Toast.error("Please enter a valid email");
      setDisabled(e.target, false);
      return;
    }

    const response = await callAPI({
      url: `${API_HOST}/forgot/password`,
      method: "POST",
      data: {
        ucp,
        email,
      },
    });

    if (response.success) {
      Toast.success("Password reset link sent to your email");
      setUCP("");
      setEmail("");
      setDisabled(e.target, false);
    } else {
      Toast.error(response.error);
      setDisabled(e.target, false);
    }
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
          <div className="position-relative d-none d-lg-flex flex-column justify-content-center align-items-center width-left">
            <Image
              className="img-fluid"
              src={`${PUBLIC_URL}/images/forgot-hero.svg`}
              alt="Login Hero"
              quality={100}
              width={400}
              height={300}
            />
          </div>
          <div className="d-flex mx-auto align-items-left justify-content-left width-right mx-lg-0">
            <div className="right mx-lg-0 mx-auto">
              <div className="align-items-center justify-content-center d-lg-none d-flex">
                <Image
                  className="img-fluid"
                  src={`${PUBLIC_URL}/images/forgot-hero.svg`}
                  alt="Login Hero"
                  width={351.75}
                  height={300.58}
                />
              </div>
              <h3 className="title-text">Forgot Page</h3>
              <p className="caption-text">
                If you have forgotten your password, email, or UCP, you can
                reset it here.
              </p>
              <div
                className="accordion accordion-flush w-100"
                id="accordionFlushExample"
                style={{ minHeight: "206px" }}
              >
                <div
                  className="accordion-item"
                  style={{ backgroundColor: "#211f2d" }}
                >
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      Forgot Password
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <div style={{ marginBottom: "1.75rem" }}>
                        <label htmlFor="ucp" className="d-block input-label">
                          UCP
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
                            type="text"
                            name="ucp"
                            id="ucp"
                            placeholder="UCP account"
                            value={ucp}
                            onChange={(e) => setUCP(e.target.value)}
                          />
                        </div>
                      </div>
                      <div style={{ marginTop: "1rem" }}>
                        <label htmlFor="email" className="d-block input-label">
                          Email Address
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
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-fill text-white border-0 mt-3 p-2"
                        style={{ fontSize: "1em" }}
                        onClick={resetPassword}
                      >
                        Reset Password
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion-item"
                  style={{ backgroundColor: "#211f2d" }}
                >
                  <h2 className="accordion-header" id="flush-headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      Forgot Email
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body text-white">
                      Jika Anda lupa email, silahkan lakukan hal dibawah ini:
                      <br />
                      <div className="d-flex flex-column mt-3 text-justify">
                        <p>
                          1. Jika Anda masih bisa login ke game, silahkan
                          gunakan {"'/report'"} dan meminta Admin/Helper yang
                          sedang online untuk melihat email akun Anda.
                        </p>
                        <p>
                          2. Jika Anda tidak bisa login ke game, Anda dapat
                          mengirimkan <em>Direct Message</em> ke Head Admin
                          melalui Discord Server Relived Roleplay.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion-item"
                  style={{ backgroundColor: "#211f2d" }}
                >
                  <h2 className="accordion-header" id="flush-headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      Forgot UCP
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body text-white">
                      Jika Anda lupa UCP, silahkan lakukan hal dibawah ini:
                      <br />
                      <div className="d-flex flex-column mt-3 text-justify">
                        <p>
                          1. Jika Anda masih bisa login ke game menggunakan nama
                          karakter dari UCP Anda, silahkan gunakan {"'/stats'"}{" "}
                          untuk melihat UCP Anda.
                        </p>
                        <p>
                          2. Jika Anda tidak bisa login ke game, Anda dapat
                          mengirimkan <em>Direct Message</em> ke Head Admin
                          melalui Discord Server Relived Roleplay.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="content-2-3">
                <Link href="/login" scroll={false}>
                  <a className="btn btn-fill text-white border-0 d-block w-100">
                    Go to Login
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
