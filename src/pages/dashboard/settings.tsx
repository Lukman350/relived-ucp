import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cookies from "js-cookie";
import { useState } from "react";
import callAPI from "@/config/api";

import Toast from "@/components/Toast";
import {
  getUserID,
  getAccount,
  isTokenValid,
  isValidEmail,
  API_HOST,
} from "@/components/Utils";
import { SettingsProps } from "@/data-types";

export default function Settings({ account }: SettingsProps) {
  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [curEmail, setCurEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const changePassword = async (e: any) => {
    e.preventDefault();

    if (!curPassword || !newPassword || !confirmPassword) {
      Toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.error("New password and confirm password does not match");
      return;
    }

    const token = Cookies.get("token");

    if (token) {
      const res = await callAPI({
        url: `${API_HOST}/user/settings`,
        method: "POST",
        data: {
          type: "password",
          id: getUserID(token),
          curPassword,
          newPassword,
        },
        token,
      });

      if (res.success) {
        Toast.success(`Password for UCP ${res.data.Username} has been changed`);
        setCurPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        Toast.error(res.error);
      }
    }
  };

  const changeEmail = async (e: any) => {
    e.preventDefault();

    if (!curEmail || !newEmail || !confirmEmail) {
      Toast.error("Please fill in all fields");
      return;
    }

    if (
      !isValidEmail(newEmail) ||
      !isValidEmail(confirmEmail) ||
      !isValidEmail(curEmail)
    ) {
      Toast.error("Email address is not valid");
      return;
    }

    if (newEmail !== confirmEmail) {
      Toast.error("New email and confirm email does not match");
      return;
    }

    const token = Cookies.get("token");

    if (token) {
      const res = await callAPI({
        url: `${API_HOST}/user/settings`,
        method: "POST",
        data: {
          type: "email",
          id: getUserID(token),
          curEmail,
          newEmail,
        },
        token
      });

      if (res.success) {
        Toast.success(`Email for UCP ${res.data.Username} has been changed`);
        setCurEmail("");
        setNewEmail("");
        setConfirmEmail("");
      } else {
        Toast.error(res.error);
      }
    }
  };

  return (
    <Layout title="Relived - Settings Page">
      <Navbar account={account} />
      <section
        className="h-100 w-100 text-white"
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
            className="mx-auto d-flex flex-lg-row flex-column hero"
            style={{ minHeight: "480px" }}
          >
            <div className="d-flex flex-lg-grow-1 flex-column align-items-lg-center align-items-center content-3-6">
              <h3
                className="text-center m-3"
                data-aos="zoom-in"
                data-aos-once="true"
              >
                Account Settings
              </h3>
              <div className="accordion" id="accordionExample">
                <div
                  className="accordion-item"
                  data-aos="zoom-in-up"
                  data-aos-once="true"
                  style={{ backgroundColor: "#211f2d" }}
                >
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Change Password
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div style={{ marginBottom: "1.75rem" }}>
                        <label
                          htmlFor="currentPass"
                          className="d-block input-label"
                        >
                          Current Password
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
                            id="currentPass"
                            placeholder="Current password"
                            value={curPassword}
                            onChange={(e) => setCurPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div style={{ marginTop: "1rem" }}>
                        <label
                          htmlFor="newPass"
                          className="d-block input-label"
                        >
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
                            id="newPass"
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div style={{ marginTop: "1rem" }}>
                        <label
                          htmlFor="confNewPass"
                          className="d-block input-label"
                        >
                          Confirm New Password
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
                            id="confNewPass"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-fill text-white border-0 mt-3 p-2"
                        style={{ fontSize: "1em" }}
                        onClick={changePassword}
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion-item"
                  data-aos="zoom-in-up"
                  data-aos-once="true"
                  style={{ backgroundColor: "#211f2d" }}
                >
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Change Email
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div style={{ marginBottom: "1.75rem" }}>
                        <label
                          htmlFor="curEmail"
                          className="d-block input-label"
                        >
                          Current Email
                        </label>
                        <div className="d-flex w-100 div-input">
                          <svg
                            className="icon"
                            style={{ marginRight: "1rem" }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5 5C3.34315 5 2 6.34315 2 8V16C2 17.6569 3.34315 19 5 19H19C20.6569 19 22 17.6569 22 16V8C22 6.34315 20.6569 5 19 5H5ZM5.49607 7.13174C5.01655 6.85773 4.40569 7.02433 4.13168 7.50385C3.85767 7.98337 4.02427 8.59422 4.50379 8.86823L11.5038 12.8682C11.8112 13.0439 12.1886 13.0439 12.4961 12.8682L19.4961 8.86823C19.9756 8.59422 20.1422 7.98337 19.8682 7.50385C19.5942 7.02433 18.9833 6.85773 18.5038 7.13174L11.9999 10.8482L5.49607 7.13174Z"
                              fill="#4E4B62"
                            />
                          </svg>
                          <input
                            className="input-field"
                            type="email"
                            id="curEmail"
                            value={curEmail}
                            onChange={(e) => setCurEmail(e.target.value)}
                            placeholder="Current email address"
                          />
                        </div>
                      </div>
                      <div style={{ marginTop: "1rem" }}>
                        <label
                          htmlFor="newEmail"
                          className="d-block input-label"
                        >
                          New Email
                        </label>
                        <div className="d-flex w-100 div-input">
                          <svg
                            className="icon"
                            style={{ marginRight: "1rem" }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5 5C3.34315 5 2 6.34315 2 8V16C2 17.6569 3.34315 19 5 19H19C20.6569 19 22 17.6569 22 16V8C22 6.34315 20.6569 5 19 5H5ZM5.49607 7.13174C5.01655 6.85773 4.40569 7.02433 4.13168 7.50385C3.85767 7.98337 4.02427 8.59422 4.50379 8.86823L11.5038 12.8682C11.8112 13.0439 12.1886 13.0439 12.4961 12.8682L19.4961 8.86823C19.9756 8.59422 20.1422 7.98337 19.8682 7.50385C19.5942 7.02433 18.9833 6.85773 18.5038 7.13174L11.9999 10.8482L5.49607 7.13174Z"
                              fill="#4E4B62"
                            />
                          </svg>
                          <input
                            className="input-field"
                            type="email"
                            id="newEmail"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="New email address"
                          />
                        </div>
                      </div>
                      <div style={{ marginTop: "1rem" }}>
                        <label
                          htmlFor="confirmNewEmail"
                          className="d-block input-label"
                        >
                          Confirm New Email
                        </label>
                        <div className="d-flex w-100 div-input">
                          <svg
                            className="icon"
                            style={{ marginRight: "1rem" }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5 5C3.34315 5 2 6.34315 2 8V16C2 17.6569 3.34315 19 5 19H19C20.6569 19 22 17.6569 22 16V8C22 6.34315 20.6569 5 19 5H5ZM5.49607 7.13174C5.01655 6.85773 4.40569 7.02433 4.13168 7.50385C3.85767 7.98337 4.02427 8.59422 4.50379 8.86823L11.5038 12.8682C11.8112 13.0439 12.1886 13.0439 12.4961 12.8682L19.4961 8.86823C19.9756 8.59422 20.1422 7.98337 19.8682 7.50385C19.5942 7.02433 18.9833 6.85773 18.5038 7.13174L11.9999 10.8482L5.49607 7.13174Z"
                              fill="#4E4B62"
                            />
                          </svg>
                          <input
                            className="input-field"
                            type="email"
                            id="confirmNewEmail"
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            placeholder="Confirm new email address"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-fill text-white border-0 mt-3 p-2"
                        style={{ fontSize: "1em" }}
                        onClick={changeEmail}
                      >
                        Change Email
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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

  const account = await getAccount(token);

  return {
    props: {
      account,
    },
  };
}
