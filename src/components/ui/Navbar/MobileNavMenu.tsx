// React
import { FC, useContext } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Context
import { AppContext } from "../../../context/AppContext";

// Utils
import { activeNavItemCSS, nonActiveNavItemCSS } from "../../../utils/css";

interface IProps {
  isOpen: boolean;
}

const MobileNavMenu: FC<IProps> = ({ isOpen }) => {
  const router = useRouter();
  const { lastSearchString } = useContext(AppContext);

  return (
    <div className="md:hidden " id="navbar-default">
      <ul
        className={`overflow-hidden text-center transition-all ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <li className="mt-3 mb-2">
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

export default MobileNavMenu;
