// React
import { FC, useContext } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Context
import { AppContext } from "../../../context/AppContext";

// Utils
import { activeNavItemCSS, nonActiveNavItemCSS } from "../../../utils/css";

const NavMenu: FC = () => {
  const router = useRouter();
  const { lastSearchString } = useContext(AppContext);

  return (
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="mt-4 flex flex-col p-2 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:font-medium">
        <li>
          <Link href="/" passHref={true}>
            <a
              className={
                router?.pathname === "/"
                  ? activeNavItemCSS
                  : nonActiveNavItemCSS
              }
            >
              National
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/state${lastSearchString}`} passHref={true}>
            <a
              className={
                router?.pathname === "/state"
                  ? activeNavItemCSS
                  : nonActiveNavItemCSS
              }
            >
              State
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavMenu;
