import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { HomeProps } from "@/data-types";
import Cookies from "js-cookie";
import DisplayServer from "@/components/DisplayServer";
import { isTokenValid, PUBLIC_URL } from "@/components/Utils";

export default function Landing({ data }: HomeProps) {
  const router = useRouter();

  useEffect(() => {
    if (isTokenValid(Cookies.get("token"))) {
      router.push("/dashboard/");
    }
  }, [router]);

  return (
    <>
      <section
        className="h-100 w-100"
        style={{ boxSizing: "border-box", backgroundColor: "#141432" }}
      >
        <div
          className="container-xxl mx-auto p-0 position-relative header-2-3"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <nav className="navbar navbar-expand-lg navbar-dark">
            <a href="#">
              <Image
                src={`${PUBLIC_URL}/images/logo.png`}
                className="rounded-circle mr-2"
                quality={100}
                alt="Logo"
                height={40}
                width={40}
              />
            </a>
            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#targetModal-item"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="modal-item modal fade"
              id="targetModal-item"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="targetModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div
                  className="modal-content border-0"
                  style={{ backgroundColor: "#141432" }}
                >
                  <div
                    className="modal-header border-0"
                    style={{ padding: "2rem", paddingBottom: 0 }}
                  >
                    <a className="modal-title" id="targetModalLabel">
                      <Image
                        className="rounded-circle"
                        src={`${PUBLIC_URL}/images/logo.png`}
                        alt="Logo"
                        height={40}
                        width={40}
                      />
                    </a>
                    <button
                      type="button"
                      className="close btn-close text-white"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div
                    className="modal-body"
                    style={{
                      padding: "2rem",
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    <ul className="navbar-nav responsive me-auto mt-2 mt-lg-0">
                      <li
                        className={
                          router.pathname === "/"
                            ? "nav-item active"
                            : "nav-item"
                        }
                      >
                        <a
                          className="nav-link"
                          href="#"
                          style={
                            router.pathname === "/" ? { color: "#e7e7e8" } : {}
                          }
                        >
                          Home
                        </a>
                      </li>
                      <li
                        className={
                          router.pathname === "/#about"
                            ? "nav-item active"
                            : "nav-item"
                        }
                      >
                        <a
                          className="nav-link"
                          href="#about"
                          style={
                            router.pathname === "/#about"
                              ? { color: "#e7e7e8" }
                              : {}
                          }
                        >
                          About Us
                        </a>
                      </li>
                      <li
                        className={
                          router.pathname === "/#features"
                            ? "nav-item active"
                            : "nav-item"
                        }
                      >
                        <a
                          className="nav-link"
                          href="#features"
                          style={
                            router.pathname === "/#features"
                              ? { color: "#e7e7e8" }
                              : {}
                          }
                        >
                          Features
                        </a>
                      </li>
                      <li
                        className={
                          router.pathname === "/#changelog"
                            ? "nav-item active"
                            : "nav-item"
                        }
                      >
                        <a
                          className="nav-link"
                          href="#changelog"
                          style={
                            router.pathname === "/#changelog"
                              ? { color: "#e7e7e8" }
                              : {}
                          }
                        >
                          Changelog
                        </a>
                      </li>
                      <li
                        className={
                          router.pathname === "/#contact"
                            ? "nav-item active"
                            : "nav-item"
                        }
                      >
                        <a
                          className="nav-link"
                          href="#contact"
                          style={
                            router.pathname === "/#contact"
                              ? { color: "#e7e7e8" }
                              : {}
                          }
                        >
                          Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="modal-footer border-0 gap-3"
                    style={{ padding: "2rem", paddingTop: "0.75rem" }}
                  >
                    <Link href={"/login"}>
                      <a className="btn btn-fill text-white border-0">Log In</a>
                    </Link>
                    <a
                      href="https://discord.gg/relivedroleplay"
                      target="_blank"
                      className="btn btn-outline btn-no-fill"
                      rel="noreferrer"
                    >
                      Join Discord
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo">
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li
                  className={
                    router.pathname === "/" ? "nav-item active" : "nav-item"
                  }
                >
                  <a
                    className="nav-link"
                    href="#"
                    style={router.pathname === "/" ? { color: "#e7e7e8" } : {}}
                  >
                    Home
                  </a>
                </li>
                <li
                  className={
                    router.pathname === "/#about"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <a
                    className="nav-link"
                    href="#about"
                    style={
                      router.pathname === "/#about" ? { color: "#e7e7e8" } : {}
                    }
                  >
                    About Us
                  </a>
                </li>
                <li
                  className={
                    router.pathname === "/#features"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <a
                    className="nav-link"
                    href="#features"
                    style={
                      router.pathname === "/#features"
                        ? { color: "#e7e7e8" }
                        : {}
                    }
                  >
                    Features
                  </a>
                </li>
                <li
                  className={
                    router.pathname === "/#changelog"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <a
                    className="nav-link"
                    href="#changelog"
                    style={
                      router.pathname === "/#changelog"
                        ? { color: "#e7e7e8" }
                        : {}
                    }
                  >
                    Changelog
                  </a>
                </li>
                <li
                  className={
                    router.pathname === "/#contact"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <a
                    className="nav-link"
                    href="#contact"
                    style={
                      router.pathname === "/#contact"
                        ? { color: "#e7e7e8" }
                        : {}
                    }
                  >
                    Contact
                  </a>
                </li>
              </ul>
              <div className="gap-3">
                <Link href={"/login"}>
                  <a className="btn btn-fill text-white border-0">Log In</a>
                </Link>
                <a
                  href="https://discord.gg/relivedroleplay"
                  target="_blank"
                  className="btn btn-outline btn-no-fill ms-3"
                  rel="noreferrer"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </nav>
          <div>
            <div className="mx-auto d-flex flex-lg-row flex-column hero">
              {/* Left Column */}
              <div className="left-column d-flex flex-lg-grow-1 flex-column align-items-lg-start text-lg-start align-items-center text-center">
                <h1 className="title-text-big">
                  Relived Roleplay
                  <br />
                  Server SA:MP dari Indonesia
                </h1>
                <div className="d-flex flex-sm-row flex-column align-items-center mx-lg-0 mx-auto justify-content-center gap-3">
                  <Link href="/login">
                    <a className="btn d-inline-flex mb-md-0 btn-try text-white border-0">
                      <div className="d-flex align-items-center">Login</div>
                    </a>
                  </Link>
                  <a
                    href="https://discord.gg/relivedroleplay"
                    target="_blank"
                    className="btn btn-outline"
                    rel="noreferrer"
                  >
                    Join Discord
                  </a>
                </div>
              </div>
              {/* Right Column */}
              <div className="right-column text-center d-flex justify-content-center pe-0">
                <Image
                  id="img-fluid"
                  className="h-auto mw-100"
                  quality={100}
                  src={`${PUBLIC_URL}/images/header-1.svg`}
                  alt="Header"
                  width={570}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="h-100 w-100"
        style={{ boxSizing: "border-box", backgroundColor: "#141432" }}
        id="about"
      >
        <div
          className="content-2-3 container-xxl mx-auto p-0 position-relative"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <div className="title-text">
            <h1 className="text-title text-center text-white">About Us</h1>
            <div className="d-block mx-auto">
              <p className="text-caption text-center about-text">
                Relived Roleplay adalah sebuah server SA:MP yang didirikan pada
                tahun 2019 yang dahulunya adalah Lacoste Roleplay. Tujuan
                dibuatnya server ini adalah untuk meningkatkan kualitas dan
                kenyamanan serta kepuasan dalam bermain.
              </p>
            </div>
          </div>
          <div className="grid-padding text-center">
            <div className="row">
              <div className="col-lg-6 column">
                <DisplayServer data={data} />
                <h3 className="icon-title text-white mt-3">
                  Server Statistics
                </h3>
                <p className="icon-caption">
                  This can easily help you to
                  <br />
                  see server statistics
                </p>
              </div>
              <div className="col-lg-6 column">
                <div className="d-flex align-items-center justify-content-center">
                  <iframe
                    src="https://discord.com/widget?id=914691384345239592&theme=dark"
                    width="500"
                    height="500"
                    frameBorder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  ></iframe>
                </div>
                <h3 className="icon-title text-white mt-3">Discord Status</h3>
                <p className="icon-caption">
                  This can easily help you to
                  <br />
                  see the status of Relived Discord Server
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="h-100 w-100"
        style={{ boxSizing: "border-box", backgroundColor: "#141432" }}
      >
        <div
          className="footer-2-3 container-xxl mx-auto position-relative p-0"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <div className="list-footer">
            <div className="row gap-md-0 gap-3">
              <div className="col-lg-4 col-md-12">
                <div className="">
                  <div className="list-space">
                    <Image
                      src={`${PUBLIC_URL}/images/logo.png`}
                      quality={100}
                      alt="Logo"
                      height={40}
                      width={40}
                    />
                  </div>
                  <nav className="list-unstyled">
                    <li className="list-space">
                      <a href="#" className="list-menu">
                        Home
                      </a>
                    </li>
                    <li className="list-space">
                      <a href="#about" className="list-menu">
                        About Us
                      </a>
                    </li>
                    <li className="list-space">
                      <a href="#features" className="list-menu">
                        Features
                      </a>
                    </li>
                    <li className="list-space">
                      <a href="#changelog" className="list-menu">
                        Changelog
                      </a>
                    </li>
                    <li className="list-space">
                      <a href="#contact" className="list-menu">
                        Contact
                      </a>
                    </li>
                  </nav>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <h2 className="footer-text-title text-white">Company</h2>
                <nav className="list-unstyled">
                  <li className="list-space">
                    <a href="" className="list-menu">
                      Contact Us
                    </a>
                  </li>
                  <li className="list-space">
                    <a href="" className="list-menu">
                      Blog
                    </a>
                  </li>
                  <li className="list-space">
                    <a href="" className="list-menu">
                      Culture
                    </a>
                  </li>
                  <li className="list-space">
                    <a href="" className="list-menu">
                      Security
                    </a>
                  </li>
                </nav>
              </div>
              <div className="col-lg-4 col-md-12">
                <h2 className="footer-text-title text-white">Support</h2>
                <nav className="list-unstyled">
                  <li className="list-space">
                    <a href="" className="list-menu">
                      Getting Started
                    </a>
                  </li>
                  <li className="list-space">
                    <a href="" className="list-menu">
                      Help Center
                    </a>
                  </li>
                  <li className="list-space">
                    <a href="" className="list-menu">
                      Server Status
                    </a>
                  </li>
                </nav>
              </div>
            </div>
          </div>
          <div className="border-color info-footer">
            <div className="">
              <hr className="hr" />
            </div>
            <div className="mx-auto d-flex flex-column flex-lg-row align-items-center justify-content-lg-between justify-content-md-center justify-content-sm-center footer-info-space gap-4">
              <div className="d-flex title-font font-medium align-items-center gap-4">
                <a
                  href="https://facebook.com/groups/717712242429203/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <svg
                    className="social-media-c social-media-left"
                    width={30}
                    height={30}
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx={15} cy={15} r={15} fill="#707092" />
                    <g clipPath="url(#clip0)">
                      <path
                        d="M17.6648 9.65667H19.1254V7.11267C18.8734 7.078 18.0068 7 16.9974 7C14.8914 7 13.4488 8.32467 13.4488 10.7593V13H11.1248V15.844H13.4488V23H16.2981V15.8447H18.5281L18.8821 13.0007H16.2974V11.0413C16.2981 10.2193 16.5194 9.65667 17.6648 9.65667Z"
                        fill="#141432"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect
                          width={16}
                          height={16}
                          fill="white"
                          transform="translate(7 7)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/relivedcommunity/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <svg
                    className="social-media-p"
                    width={30}
                    height={30}
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.8711 15C17.8711 16.5857 16.5857 17.8711 15 17.8711C13.4143 17.8711 12.1289 16.5857 12.1289 15C12.1289 13.4143 13.4143 12.1289 15 12.1289C16.5857 12.1289 17.8711 13.4143 17.8711 15Z"
                      fill="#707092"
                    />
                    <path
                      d="M21.7144 9.92039C21.5764 9.5464 21.3562 9.20789 21.0701 8.93002C20.7923 8.64392 20.454 8.42374 20.0797 8.28572C19.7762 8.16785 19.3203 8.02754 18.4805 7.98932C17.5721 7.94789 17.2997 7.93896 14.9999 7.93896C12.6999 7.93896 12.4275 7.94766 11.5193 7.98909C10.6796 8.02754 10.2234 8.16785 9.92014 8.28572C9.54591 8.42374 9.2074 8.64392 8.92976 8.93002C8.64366 9.20789 8.42348 9.54617 8.28523 9.92039C8.16736 10.2239 8.02705 10.6801 7.98883 11.5198C7.9474 12.428 7.93848 12.7004 7.93848 15.0004C7.93848 17.3002 7.9474 17.5726 7.98883 18.481C8.02705 19.3208 8.16736 19.7767 8.28523 20.0802C8.42348 20.4545 8.64343 20.7927 8.92953 21.0706C9.2074 21.3567 9.54568 21.5769 9.91991 21.7149C10.2234 21.833 10.6796 21.9733 11.5193 22.0115C12.4275 22.053 12.6997 22.0617 14.9997 22.0617C17.3 22.0617 17.5723 22.053 18.4803 22.0115C19.3201 21.9733 19.7762 21.833 20.0797 21.7149C20.8309 21.4251 21.4247 20.8314 21.7144 20.0802C21.8323 19.7767 21.9726 19.3208 22.011 18.481C22.0525 17.5726 22.0612 17.3002 22.0612 15.0004C22.0612 12.7004 22.0525 12.428 22.011 11.5198C21.9728 10.6801 21.8325 10.2239 21.7144 9.92039ZM14.9999 19.4231C12.5571 19.4231 10.5768 17.4431 10.5768 15.0002C10.5768 12.5573 12.5571 10.5773 14.9999 10.5773C17.4426 10.5773 19.4229 12.5573 19.4229 15.0002C19.4229 17.4431 17.4426 19.4231 14.9999 19.4231ZM19.5977 11.4361C19.0269 11.4361 18.5641 10.9733 18.5641 10.4024C18.5641 9.83159 19.0269 9.36879 19.5977 9.36879C20.1685 9.36879 20.6313 9.83159 20.6313 10.4024C20.6311 10.9733 20.1685 11.4361 19.5977 11.4361Z"
                      fill="#707092"
                    />
                    <path
                      d="M15 0C6.717 0 0 6.717 0 15C0 23.283 6.717 30 15 30C23.283 30 30 23.283 30 15C30 6.717 23.283 0 15 0ZM23.5613 18.5511C23.5197 19.468 23.3739 20.094 23.161 20.6419C22.7135 21.7989 21.7989 22.7135 20.6419 23.161C20.0942 23.3739 19.468 23.5194 18.5513 23.5613C17.6328 23.6032 17.3394 23.6133 15.0002 23.6133C12.6608 23.6133 12.3676 23.6032 11.4489 23.5613C10.5322 23.5194 9.90601 23.3739 9.35829 23.161C8.78334 22.9447 8.26286 22.6057 7.83257 22.1674C7.39449 21.7374 7.05551 21.2167 6.83922 20.6419C6.62636 20.0942 6.48056 19.468 6.4389 18.5513C6.39656 17.6326 6.38672 17.3392 6.38672 15C6.38672 12.6608 6.39656 12.3674 6.43867 11.4489C6.48033 10.532 6.6259 9.90601 6.83876 9.35806C7.05505 8.78334 7.39426 8.26263 7.83257 7.83257C8.26263 7.39426 8.78334 7.05528 9.35806 6.83899C9.90601 6.62613 10.532 6.48056 11.4489 6.43867C12.3674 6.39679 12.6608 6.38672 15 6.38672C17.3392 6.38672 17.6326 6.39679 18.5511 6.4389C19.468 6.48056 20.094 6.62613 20.6419 6.83876C21.2167 7.05505 21.7374 7.39426 22.1677 7.83257C22.6057 8.26286 22.9449 8.78334 23.161 9.35806C23.3741 9.90601 23.5197 10.532 23.5616 11.4489C23.6034 12.3674 23.6133 12.6608 23.6133 15C23.6133 17.3392 23.6034 17.6326 23.5613 18.5511Z"
                      fill="#707092"
                    />
                  </svg>
                </a>
              </div>
              <nav className="d-flex flex-lg-row flex-column align-items-center justify-content-center">
                <p style={{ margin: 0 }}>
                  Copyright &copy; {new Date().getFullYear()} Relived Community.
                  Developed by{" "}
                  <a
                    href="https://instagram.com/lukmaan.24/"
                    rel="noreferrer"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    Lukman
                  </a>
                </p>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
