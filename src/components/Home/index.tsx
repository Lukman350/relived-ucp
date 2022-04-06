/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { HomeProps } from "@/data-types";
import { PUBLIC_URL, isTokenValid, setDisabled } from "@/components/Utils";
import NavLink from "@/components/NavLink";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Skeleton from "react-loading-skeleton";
import changelog from "@/services/changelog";
import Toast from "@/components/Toast";
import callAPI from "@/config/api";

export default function Landing({ data }: HomeProps) {
  const router = useRouter();

  useEffect(() => {
    const token: string = Cookies.get("token") || "";

    if (isTokenValid(token)) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setDisabled(e.target, true);

    const data = new FormData(e.target);
    const res = await callAPI({
      url: "https://formspree.io/f/mnqwbyez",
      method: "POST",
      data,
    });

    if (res.success) {
      Toast.success("Pesan kamu telah berhasil terkirim");
      setDisabled(e.target, false);
    } else {
      Toast.error("Terjadi kesalahan saat mengirim pesan");
      setDisabled(e.target, false);
    }
  };
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
                      onClick={(e) => e.preventDefault()}
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
                      <NavLink href="/">Home</NavLink>
                      <NavLink href="/#about">About Us</NavLink>
                      <NavLink href="/#features">Features</NavLink>
                      <NavLink href="/#changelog">Changelog</NavLink>
                      <NavLink href="/#contact">Contact</NavLink>
                    </ul>
                  </div>
                  <div
                    className="modal-footer border-0 gap-3"
                    style={{ padding: "2rem", paddingTop: "0.75rem" }}
                  >
                    <a
                      href="/login"
                      className="btn btn-fill text-white border-0"
                    >
                      Log In
                    </a>
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
                <NavLink href="/">Home</NavLink>
                <NavLink href="/#about">About Us</NavLink>
                <NavLink href="/#features">Features</NavLink>
                <NavLink href="/#changelog">Changelog</NavLink>
                <NavLink href="/#contact">Contact</NavLink>
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
              <div
                className="left-column d-flex flex-lg-grow-1 flex-column align-items-lg-start text-lg-start align-items-center text-center"
                data-aos="zoom-out-up"
              >
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
              <div
                className="right-column text-center d-flex justify-content-center pe-0"
                data-aos="zoom-out-down"
              >
                <Image
                  className="img-fluid h-auto mw-100"
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
      {/* About */}
      <section
        className="h-100 w-100"
        style={{ boxSizing: "border-box", backgroundColor: "#141432" }}
        id="about"
      >
        <div
          className="content-2-3 container-xxl mx-auto p-0 position-relative"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <div className="title-text" data-aos="zoom-in">
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
              <div className="col-lg-6 column" data-aos="fade-zoom-in">
                <div className="text-start">
                  <style jsx>
                    {`
                      table:hover {
                        cursor: pointer;
                      }

                      table {
                        width: 100%;
                        margin: auto;
                      }

                      .responsive-table {
                        display: block;
                        height: 400px;
                        max-width: 100%;
                        overflow: auto;
                        white-space: nowrap;
                      }

                      tr:hover {
                        color: #ccc;
                      }
                    `}
                  </style>
                  <div className="responsive-table">
                    <table
                      className="table table-responsive text-white"
                      style={{ backgroundColor: "#141432" }}
                    >
                      <tbody>
                        {data === null ? (
                          <tr>
                            <td>
                              <Skeleton count={5} height={32} duration={5} />
                            </td>
                          </tr>
                        ) : (
                          <>
                            <tr>
                              <td>Status</td>
                              <td>
                                {data === null ? (
                                  <b className="text-danger">OFF</b>
                                ) : (
                                  <b className="text-success">ON</b>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Hostname</td>
                              <td>
                                {data.hostname || <Skeleton duration={5} />}
                              </td>
                            </tr>
                            <tr>
                              <td>IP</td>
                              <td>
                                {`samp.relivedrp.com atau ${data.address}` || (
                                  <Skeleton duration={5} />
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Players</td>
                              <td>
                                {data ? (
                                  `${data.online} / ${data.maxplayers}`
                                ) : (
                                  <Skeleton duration={5} />
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Gamemode</td>
                              <td>
                                {data.gamemode || <Skeleton duration={5} />}
                              </td>
                            </tr>
                            <tr>
                              <td>Mapname</td>
                              <td>
                                {data.mapname || <Skeleton duration={5} />}
                              </td>
                            </tr>
                            <tr>
                              <td>Version</td>
                              <td>
                                {data.rules.version || (
                                  <Skeleton duration={5} />
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Weburl</td>
                              <td>
                                {data.rules.weburl || <Skeleton duration={5} />}
                              </td>
                            </tr>
                            <tr>
                              <td>Weather</td>
                              <td>
                                {data.rules.weather || (
                                  <Skeleton duration={5} />
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Worldtime</td>
                              <td>
                                {data.rules.worldtime || (
                                  <Skeleton duration={5} />
                                )}
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <h3 className="icon-title text-white mt-3">
                  Server Statistics
                </h3>
                <p className="icon-caption">
                  Ini dapat dengan mudah membantu Anda untuk
                  <br />
                  melihat status server kami
                </p>
              </div>
              <div className="col-lg-6 column" data-aos="fade-zoom-in">
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
                  Ini dapat dengan mudah membantu Anda untuk
                  <br />
                  melihat status Discord Server kami
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About end */}
      {/* Features */}
      <section
        className="h-100 w-100"
        style={{ boxSizing: "border-box", backgroundColor: "#141432" }}
        id="features"
      >
        <div
          className="content-2-3 container-xxl mx-auto p-0 position-relative"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <div className="title-text" data-aos="zoom-in">
            <h1 className="text-title text-center text-white">Features</h1>
            <div className="d-block mx-auto">
              <p className="text-caption text-center about-text">
                Relived Roleplay memiliki beberapa fitur yang dapat memberikan
                permainan yang lebih menarik.
              </p>
            </div>
          </div>

          <div className="grid-padding text-center">
            <div className="row">
              <div className="col-lg-6 column text-white" data-aos="zoom-in-up">
                <Image
                  src={`${PUBLIC_URL}/images/features/gallery1.jpg`}
                  height="250"
                  width="500"
                  className="img-thumbnail border border-1"
                  quality="100"
                  alt="Bus Sidejob"
                />
                <h3 className="icon-title text-white mt-3">Bus Sidejob</h3>
                <p className="icon-caption">
                  Bus Sidejob adalah pekerjaan menjadi seorang supir bus.
                  <br />
                  Rute perjalanan bus diacak secara random.
                </p>
              </div>
              <div className="col-lg-6 column text-white" data-aos="zoom-in-up">
                <Image
                  src={`${PUBLIC_URL}/images/features/gallery2.jpg`}
                  height="250"
                  width="500"
                  className="img-thumbnail border border-1"
                  quality="100"
                  alt="Fish Factory"
                />
                <h3 className="icon-title text-white mt-3">Fishing</h3>
                <p className="icon-caption">
                  Fishing adalah pekerjaan sampingan atau aktifitas memancing,
                  <br />
                  Anda dapat memancing di Santa Maria Beach dan juga Pelabuhan
                  Pier. Pendapatan sesuai dengan hasil pancing mu.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 column text-white" data-aos="zoom-in-up">
                <Image
                  src={`${PUBLIC_URL}/images/features/gallery3.jpg`}
                  height="250"
                  width="500"
                  className="img-thumbnail border border-1"
                  quality="100"
                  alt="Mechanic Center"
                />
                <h3 className="icon-title text-white mt-3">Mechanic Job</h3>
                <p className="icon-caption">
                  Mechanic Job adalah pekerjaan menjadi montir yang bekerja
                  memperbaiki kendaraan
                  <br />
                  dan juga Anda dapat memodifikasi kendaraan di Bengkel Pribadi
                  Anda
                </p>
              </div>
              <div className="col-lg-6 column text-white" data-aos="zoom-in-up">
                <Image
                  src={`${PUBLIC_URL}/images/features/gallery4.jpg`}
                  height="250"
                  width="500"
                  className="img-thumbnail border border-1"
                  quality="100"
                  alt="Trashmaster"
                />
                <h3 className="icon-title text-white mt-3">
                  Trashmaster Sidejob
                </h3>
                <p className="icon-caption">
                  Trashmaster Sidejob adalah pekerjaan sampingan menjadi seorang
                  pemungut sampah menggunakan mobil khusus pada tempat sampah
                  yang ada di Kota Los Santos.
                  <br />
                  Pendapatan pekerjaan ini sesuai dengan hasil sampah yang kamu
                  ambil.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 column text-white" data-aos="zoom-in-up">
                <Image
                  src={`${PUBLIC_URL}/images/features/gallery5.jpg`}
                  height="250"
                  width="500"
                  className="img-thumbnail border border-1"
                  quality="100"
                  alt="Farmer"
                />
                <h3 className="icon-title text-white mt-3">Farmer Job</h3>
                <p className="icon-caption">
                  Farmer adalah pekerjaan menjadi seorang petani yang bekerja
                  menanam bibit-bibit yang telah dibeli.
                  <br />
                  Anda dapat menjual hasil panen di Flint County
                </p>
              </div>
              <div className="col-lg-6 column text-white" data-aos="zoom-in-up">
                <Image
                  src={`${PUBLIC_URL}/images/features/gallery6.jpg`}
                  height="250"
                  width="500"
                  className="img-thumbnail border border-1"
                  quality="100"
                  alt="Cargo Unloader"
                />
                <h3 className="icon-title text-white mt-3">
                  Cargo Unloader Sidejob
                </h3>
                <p className="icon-caption">
                  Cargo Unloader adalah pekerjaan sampingan menjadi seorang
                  pengangkut barang yang di dalam box menggunakan Forklift.
                  <br />
                  Pekerjaan ini berada di Blueberry Acres.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 column text-white" data-aos="zoom-in-up">
                <Image
                  src={`${PUBLIC_URL}/images/features/gallery7.jpg`}
                  height="250"
                  width="500"
                  className="img-thumbnail border border-1"
                  quality="100"
                  alt="Package Sorter"
                />
                <h3 className="icon-title text-white mt-3">
                  Package Sorter Sidejob
                </h3>
                <p className="icon-caption">
                  Package Sorter adalah pekerjaan sampingan menjadi seorang
                  pengangkut box lalu mengantarkannya ke point yang sudah
                  disediakan.
                  <br />
                  Pekerjaan ini berada di Flint County.
                </p>
              </div>
              <div className="col-lg-6 column text-white" data-aos="zoom-in-up">
                <Image
                  src={`${PUBLIC_URL}/images/features/gallery8.jpg`}
                  height="250"
                  width="500"
                  className="img-thumbnail border border-1"
                  quality="100"
                  alt="Sweeper"
                />
                <h3 className="icon-title text-white mt-3">Sweeper Sidejob</h3>
                <p className="icon-caption">
                  Sweeper adalah pekerjaan sampingan menjadi seorang pembersih
                  jalanan Kota Los Santos menggunakan mobil khusus.
                  <br />
                  Pekerjaan ini berada di Commerce.
                </p>
              </div>
            </div>

            <p
              className="icon-caption text-white text-center mt-4"
              data-aos="zoom-in-up"
            >
              Masih banyak lagi fitur yang ada di server kami, penasaran?
              <br />
              Langsung saja daftarkan akunmu di Discord kami 😊.
            </p>
          </div>
        </div>
      </section>
      {/* Features End */}
      {/* Changelog */}
      <section
        className="h-100 w-100"
        style={{ boxSizing: "border-box", backgroundColor: "#141432" }}
        id="changelog"
      >
        <div
          className="content-2-3 container-xxl mx-auto p-0 position-relative"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <div className="title-text" data-aos="zoom-in">
            <h1 className="text-title text-center text-white">Changelog</h1>
            <div className="d-block mx-auto">
              <p className="text-caption text-center about-text">
                Berikut adalah daftar perubahan yang telah kami lakukan
                terakhir. Anda dapat melihat perubahan terbaru di Discord kami.
              </p>
            </div>
          </div>

          <div className="grid-padding text-center text-white">
            <div className="card" data-aos="zoom-in-up">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className="fs-4 text-white">
                  <span className="badge bg-success">{changelog.version}</span>
                </h3>
                <small>
                  Terakhir update: <strong>{changelog.date}</strong>
                </small>
              </div>
              <div className="row text-start">
                <div className="col-lg-4">
                  <div className="text-center">
                    <p className="lead">Added</p>
                  </div>
                  <p className="card-caption">
                    {changelog.added.map((text, no) => {
                      return (
                        <span
                          key={no}
                          dangerouslySetInnerHTML={{
                            __html: `${no + 1}. ${text.text} <br />`,
                          }}
                        ></span>
                      );
                    })}
                  </p>
                </div>
                <div className="col-lg-4 mt-3">
                  <div className="text-center">
                    <p className="lead">Changes</p>
                  </div>
                  <p className="card-caption">
                    {changelog.changes.map((text, no) => {
                      return (
                        <span
                          key={no}
                          dangerouslySetInnerHTML={{
                            __html: `${no + 1}. ${text.text} <br />`,
                          }}
                        ></span>
                      );
                    })}
                  </p>
                </div>
                <div className="col-lg-4 mt-3">
                  <div className="text-center">
                    <p className="lead">Bug Fixes</p>
                  </div>
                  <p className="card-caption">
                    {changelog.fixes.map((text, no) => {
                      return (
                        <span
                          key={no}
                          dangerouslySetInnerHTML={{
                            __html: `${no + 1}. ${text.text} <br />`,
                          }}
                        ></span>
                      );
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Changelog End */}
      {/* Contact */}
      <section
        className="h-100 w-100"
        style={{ boxSizing: "border-box", backgroundColor: "#141432" }}
        id="contact"
      >
        <div
          className="content-2-3 container-xxl mx-auto p-0 position-relative"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <div className="title-text" data-aos="zoom-in">
            <h1 className="text-title text-center text-white">Contact</h1>
            <div className="d-block mx-auto">
              <p className="text-caption text-center about-text">
                Jika Anda butuh bantuan jangan ragu untuk menghubungi kami
                melalui form di bawah ini
              </p>
            </div>
          </div>

          <div className="card-block text-white" style={{ marginTop: "-3rem" }}>
            <div
              className="card mx-auto"
              data-aos="zoom-in-up"
              style={{ width: "80%" }}
            >
              <div className="d-flex flex-column align-items-start">
                <form
                  className="w-100"
                  action="https://formspree.io/f/mnqwbyez"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <div style={{ width: "100%" }}>
                    <label htmlFor="name" className="d-block input-label">
                      Nama
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
                        name="name"
                        id="name"
                        placeholder="Nama kamu"
                        required
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: "1rem", width: "100%" }}>
                    <label htmlFor="email" className="d-block input-label">
                      Email
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
                        name="email"
                        id="email"
                        placeholder="Email kamu"
                        required
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "1rem", width: "100%" }}>
                    <label htmlFor="pesan" className="d-block input-label">
                      Pesan
                    </label>
                    <div className="d-flex w-100 div-input">
                      <textarea
                        name="pesan"
                        id="pesan"
                        cols={30}
                        rows={10}
                        className="input-field"
                        placeholder="Pesan kamu"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-4 ms-2 content-3-6">
                    <button
                      className="btn btn-fill text-white border-0"
                      style={{ width: "10rem" }}
                      type="submit"
                    >
                      Kirim
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact End */}
      {/* Footer */}
      <section
        className="h-100 w-100"
        style={{ boxSizing: "border-box", backgroundColor: "#141432" }}
      >
        <div
          className="footer-2-3 container-xxl mx-auto position-relative p-0"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <div className="border-color info-footer">
            <div>
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
        {/* Footer end */}
      </section>
    </>
  );
}
