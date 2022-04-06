import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isMobile?: boolean;
}

const MobileNav = ({ href, children }: NavLinkProps) => {
  const router: NextRouter = useRouter();

  const isActive: boolean = router.asPath === href;

  return (
    <li className={isActive ? "nav-item active" : "nav-item"}>
      {isActive ? (
        <a className="nav-link" style={{ color: "#e7e7e8" }} href={href}>
          {children}
        </a>
      ) : (
        <a className="nav-link" href={href}>
          {children}
        </a>
      )}
    </li>
  );
};

export default function NavLink({ href, children, isMobile }: NavLinkProps) {
  const router: NextRouter = useRouter();

  const isActive: boolean = router.asPath === href;

  return (
    <>
      {isMobile ? (
        <MobileNav href={href}>{children}</MobileNav>
      ) : (
        <li className={isActive ? "nav-item active" : "nav-item"}>
          <Link href={href}>
            {isActive ? (
              <a className="nav-link" style={{ color: "#e7e7e8" }}>
                {children}
              </a>
            ) : (
              <a className="nav-link">{children}</a>
            )}
          </Link>
        </li>
      )}
    </>
  );
}
