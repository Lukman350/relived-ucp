/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { PUBLIC_URL, setLogout } from "@/components/Utils";
import { NavbarProps } from "@/data-types";
import NavLink from "@/components/NavLink";

export default function Navbar({ account }: NavbarProps) {
  const router = useRouter();

  return (
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
              className="rounded-circle mr-1"
              src={`${PUBLIC_URL}/images/logo.png`}
              alt="Logo"
              width={50}
              height={50}
              quality={100}
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
                      width={50}
                      height={50}
                      quality={100}
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
                    {/* Mobile Nav */}
                    <NavLink href="/dashboard" isMobile={true}>
                      Home
                    </NavLink>
                    <NavLink href="/dashboard/characters" isMobile={true}>
                      My Characters
                    </NavLink>
                    <NavLink href="/dashboard/settings" isMobile={true}>
                      Settings
                    </NavLink>
                    <NavLink href="/dashboard/donation" isMobile={true}>
                      Donation
                    </NavLink>
                    <NavLink href="#" onClick={setLogout} isMobile={true}>
                      Logout
                    </NavLink>
                  </ul>
                </div>
                <div
                  className="modal-footer border-0 gap-3"
                  style={{ padding: "2rem", paddingTop: "0.75rem" }}
                >
                  <div className="dropdown">
                    <a
                      href="#"
                      className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                      id="dropdownUser1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1"
                        width={32}
                        height={32}
                        viewBox="0 0 676 676"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        className="me-2"
                      >
                        <title>Profile</title>
                        <path
                          d="M938,450a336.852,336.852,0,0,1-27.22,133.1L909.66,585.68A338.559,338.559,0,0,1,541.35,782.93q-3.045-.54-6.08-1.12a334.98111,334.98111,0,0,1-61.14-18.03q-4.815-1.935-9.56-4.01c-2.16-.94-4.32-1.91-6.46-2.91A338.41424,338.41424,0,0,1,262,450c0-186.67,151.33-338,338-338S938,263.33,938,450Z"
                          transform="translate(-262 -112)"
                          fill="#6c63ff"
                        />
                        <path
                          d="M541.35,782.93q-3.045-.54-6.08-1.12c-1.32-38.31-5.85-116.94-21.30005-199.29C505.52,537.45,493.79,491.25,477.52,449.95a412.60387,412.60387,0,0,0-19.07-41.84c-16.44-31.05-36.38-57.19-60.56-74.9l3.56-4.86q30.165,22.11,54.22,62.08,7.215,11.97,13.86005,25.54,7.125,14.52,13.59,30.83,4.125,10.38,7.97,21.48,16.74,48.195,28.46,109.98,2.59506,13.65,4.94,27.97C536.6,680.2,540.25,748.59,541.35,782.93Z"
                          transform="translate(-262 -112)"
                          opacity="0.2"
                        />
                        <path
                          d="M464.57,759.77c-2.16-.94-4.32-1.91-6.46-2.91-2.09-22.7-5.93-50.86-12.95-77.59A254.55666,254.55666,0,0,0,433.35,644.07c-8.01-18.75-18.38-34.69-31.79-44.52l3.56-4.85c14.04,10.28,24.87,26.53,33.24,45.54,9.43,21.42,15.72,46.35,19.91,70.17C461.38,728.1,463.34,745.19,464.57,759.77Z"
                          transform="translate(-262 -112)"
                          opacity="0.2"
                        />
                        <circle
                          cx="102.26174"
                          cy="190.98167"
                          r="30.08857"
                          opacity="0.2"
                        />
                        <circle
                          cx="111.9514"
                          cy="449.99083"
                          r="30.08857"
                          opacity="0.2"
                        />
                        <path
                          d="M483.71449,353.52139c-6.38046,35.99732,7.70456,68.59225,7.70456,68.59225s24.42979-25.76825,30.81025-61.76557-7.70457-68.59225-7.70457-68.59225S490.09494,317.52407,483.71449,353.52139Z"
                          transform="translate(-262 -112)"
                          opacity="0.2"
                        />
                        <path
                          d="M383.71766,438.97122c34.33494,12.555,68.83676,4.498,68.83676,4.498s-21.16612-28.41279-55.50106-40.96784-68.83675-4.498-68.83675-4.498S349.38272,426.41617,383.71766,438.97122Z"
                          transform="translate(-262 -112)"
                          opacity="0.2"
                        />
                        <path
                          d="M377.89534,668.333c24.066,8.80008,48.28314,3.0594,48.28314,3.0594S411.37687,651.384,387.31086,642.5839s-48.28314-3.0594-48.28314-3.0594S353.82933,659.53292,377.89534,668.333Z"
                          transform="translate(-262 -112)"
                          opacity="0.2"
                        />
                        <circle
                          cx="337.30608"
                          cy="281.0788"
                          r="131.77014"
                          fill="#d0cde1"
                        />
                        <path
                          d="M547.83337,493.96531s16.47127,78.23852,16.47127,86.47415,78.23852,45.296,78.23852,45.296L712.546,613.382,737.253,539.26129s-41.17817-61.76725-41.17817-86.47415Z"
                          transform="translate(-262 -112)"
                          fill="#d0cde1"
                        />
                        <path
                          d="M910.78,583.1,909.66,585.68A338.559,338.559,0,0,1,541.35,782.93q-3.045-.54-6.08-1.12a334.98111,334.98111,0,0,1-61.14-18.03q-4.815-1.935-9.56-4.01c-2.16-.94-4.32-1.91-6.46-2.91a337.59273,337.59273,0,0,1-55.25-32.28l-15.62-45.31,8.78-6.69995,18.06-13.79,19.27-14.71,5.01-3.83,75.61-57.72,5.58-4.26,39.3-30,.01-.01s42.5,69.25,104.27,48.66,60.42-79.63,60.42-79.63Z"
                          transform="translate(-262 -112)"
                          fill="#2f2e41"
                        />
                        <path
                          d="M485.03538,286.916s41.83653-90.64581,122.02321-69.72755,125.50958,52.29566,128.996,83.67306-1.74319,78.44348-1.74319,78.44348-8.716-64.498-64.498-50.55247-142.94147,3.48638-142.94147,3.48638L512.9264,457.74849s-15.6887-22.66145-33.12058-8.71594S429.25335,314.807,485.03538,286.916Z"
                          transform="translate(-262 -112)"
                          fill="#2f2e41"
                        />
                        <path
                          d="M474.13,763.78q-4.815-1.935-9.56-4.01c-2.16-.94-4.32-1.91-6.46-2.91a338.835,338.835,0,0,1-87.59-58.7c9.19-12.52,16.72-18.89,16.72-18.89h61.77l9.26,31.14Z"
                          transform="translate(-262 -112)"
                          fill="#2f2e41"
                        />
                        <path
                          d="M856.67,576.32l52.99,9.36A337.94434,337.94434,0,0,1,852.9,674.25Z"
                          transform="translate(-262 -112)"
                          fill="#2f2e41"
                        />
                      </svg>
                      <strong>{account ? account.username : ""}</strong>
                    </a>
                    <ul
                      className="dropdown-menu text-small shadow"
                      aria-labelledby="dropdownUser1"
                    >
                      <li>
                        <a href="/dashboard/settings" className="dropdown-item">
                          Settings
                        </a>
                      </li>
                      <li>
                        <a href="/dashboard/profile" className="dropdown-item">
                          Profile
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={setLogout}
                        >
                          Log out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <NavLink href="/dashboard">Home</NavLink>
              <NavLink href="/dashboard/characters">My Characters</NavLink>
              <NavLink href="/dashboard/settings">Settings</NavLink>
              <NavLink href="/dashboard/donation">Donation</NavLink>
              <NavLink href="#" onClick={setLogout}>
                Logout
              </NavLink>
            </ul>
            <div className="gap-3">
              <div className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    width={32}
                    height={32}
                    viewBox="0 0 676 676"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="me-2"
                  >
                    <title>Profile</title>
                    <path
                      d="M938,450a336.852,336.852,0,0,1-27.22,133.1L909.66,585.68A338.559,338.559,0,0,1,541.35,782.93q-3.045-.54-6.08-1.12a334.98111,334.98111,0,0,1-61.14-18.03q-4.815-1.935-9.56-4.01c-2.16-.94-4.32-1.91-6.46-2.91A338.41424,338.41424,0,0,1,262,450c0-186.67,151.33-338,338-338S938,263.33,938,450Z"
                      transform="translate(-262 -112)"
                      fill="#6c63ff"
                    />
                    <path
                      d="M541.35,782.93q-3.045-.54-6.08-1.12c-1.32-38.31-5.85-116.94-21.30005-199.29C505.52,537.45,493.79,491.25,477.52,449.95a412.60387,412.60387,0,0,0-19.07-41.84c-16.44-31.05-36.38-57.19-60.56-74.9l3.56-4.86q30.165,22.11,54.22,62.08,7.215,11.97,13.86005,25.54,7.125,14.52,13.59,30.83,4.125,10.38,7.97,21.48,16.74,48.195,28.46,109.98,2.59506,13.65,4.94,27.97C536.6,680.2,540.25,748.59,541.35,782.93Z"
                      transform="translate(-262 -112)"
                      opacity="0.2"
                    />
                    <path
                      d="M464.57,759.77c-2.16-.94-4.32-1.91-6.46-2.91-2.09-22.7-5.93-50.86-12.95-77.59A254.55666,254.55666,0,0,0,433.35,644.07c-8.01-18.75-18.38-34.69-31.79-44.52l3.56-4.85c14.04,10.28,24.87,26.53,33.24,45.54,9.43,21.42,15.72,46.35,19.91,70.17C461.38,728.1,463.34,745.19,464.57,759.77Z"
                      transform="translate(-262 -112)"
                      opacity="0.2"
                    />
                    <circle
                      cx="102.26174"
                      cy="190.98167"
                      r="30.08857"
                      opacity="0.2"
                    />
                    <circle
                      cx="111.9514"
                      cy="449.99083"
                      r="30.08857"
                      opacity="0.2"
                    />
                    <path
                      d="M483.71449,353.52139c-6.38046,35.99732,7.70456,68.59225,7.70456,68.59225s24.42979-25.76825,30.81025-61.76557-7.70457-68.59225-7.70457-68.59225S490.09494,317.52407,483.71449,353.52139Z"
                      transform="translate(-262 -112)"
                      opacity="0.2"
                    />
                    <path
                      d="M383.71766,438.97122c34.33494,12.555,68.83676,4.498,68.83676,4.498s-21.16612-28.41279-55.50106-40.96784-68.83675-4.498-68.83675-4.498S349.38272,426.41617,383.71766,438.97122Z"
                      transform="translate(-262 -112)"
                      opacity="0.2"
                    />
                    <path
                      d="M377.89534,668.333c24.066,8.80008,48.28314,3.0594,48.28314,3.0594S411.37687,651.384,387.31086,642.5839s-48.28314-3.0594-48.28314-3.0594S353.82933,659.53292,377.89534,668.333Z"
                      transform="translate(-262 -112)"
                      opacity="0.2"
                    />
                    <circle
                      cx="337.30608"
                      cy="281.0788"
                      r="131.77014"
                      fill="#d0cde1"
                    />
                    <path
                      d="M547.83337,493.96531s16.47127,78.23852,16.47127,86.47415,78.23852,45.296,78.23852,45.296L712.546,613.382,737.253,539.26129s-41.17817-61.76725-41.17817-86.47415Z"
                      transform="translate(-262 -112)"
                      fill="#d0cde1"
                    />
                    <path
                      d="M910.78,583.1,909.66,585.68A338.559,338.559,0,0,1,541.35,782.93q-3.045-.54-6.08-1.12a334.98111,334.98111,0,0,1-61.14-18.03q-4.815-1.935-9.56-4.01c-2.16-.94-4.32-1.91-6.46-2.91a337.59273,337.59273,0,0,1-55.25-32.28l-15.62-45.31,8.78-6.69995,18.06-13.79,19.27-14.71,5.01-3.83,75.61-57.72,5.58-4.26,39.3-30,.01-.01s42.5,69.25,104.27,48.66,60.42-79.63,60.42-79.63Z"
                      transform="translate(-262 -112)"
                      fill="#2f2e41"
                    />
                    <path
                      d="M485.03538,286.916s41.83653-90.64581,122.02321-69.72755,125.50958,52.29566,128.996,83.67306-1.74319,78.44348-1.74319,78.44348-8.716-64.498-64.498-50.55247-142.94147,3.48638-142.94147,3.48638L512.9264,457.74849s-15.6887-22.66145-33.12058-8.71594S429.25335,314.807,485.03538,286.916Z"
                      transform="translate(-262 -112)"
                      fill="#2f2e41"
                    />
                    <path
                      d="M474.13,763.78q-4.815-1.935-9.56-4.01c-2.16-.94-4.32-1.91-6.46-2.91a338.835,338.835,0,0,1-87.59-58.7c9.19-12.52,16.72-18.89,16.72-18.89h61.77l9.26,31.14Z"
                      transform="translate(-262 -112)"
                      fill="#2f2e41"
                    />
                    <path
                      d="M856.67,576.32l52.99,9.36A337.94434,337.94434,0,0,1,852.9,674.25Z"
                      transform="translate(-262 -112)"
                      fill="#2f2e41"
                    />
                  </svg>

                  <strong>{account ? account.username : ""}</strong>
                </a>
                <ul
                  className="dropdown-menu text-small shadow"
                  aria-labelledby="dropdownUser1"
                >
                  <li>
                    <Link href="/dashboard/settings">
                      <a className="dropdown-item">Settings</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/profile">
                      <a className="dropdown-item">Profile</a>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={setLogout}>
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
