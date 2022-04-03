import Link from "next/link";
import { ErrorProps, ErrorPageProps } from "@/data-types";

function Error({ statusCode }: ErrorProps) {
  return (
    <section
      className="h-100 w-100"
      style={{ boxSizing: "border-box", backgroundColor: "#141432" }}
    >
      <div
        className="empty-2-3 container mx-auto d-flex align-items-center justify-content-center flex-column"
        style={{ fontFamily: '"Poppins", sans-serif' }}
      >
        <div className="text-center w-100">
          <h1 className="title-text text-white">
            Oops!{" "}
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : "An error occurred on client"}
          </h1>
          <p className="title-caption">
            {statusCode === 404
              ? "The page you’re looking for isn’t found. We suggest you Back to Homepage."
              : "We suggest you Back to Homepage."}
          </p>
          <div className="d-flex justify-content-center">
            <Link href="/">
              <a className="btn btn-back d-inline-flex text-white border-0">
                Back to Homepage
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

Error.getInitialProps = ({ res, err }: ErrorPageProps) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
