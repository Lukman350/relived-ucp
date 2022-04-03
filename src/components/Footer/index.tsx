export default function Footer() {
  return (
    <>
      <div
        className="footer-2-3 text-white"
        style={{ borderTop: "1px solid #aaa", marginTop: "-1rem" }}
      >
        <div className="text-center py-3">
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
        </div>
      </div>
    </>
  );
}
