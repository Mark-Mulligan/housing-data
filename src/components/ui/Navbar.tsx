// Next
import Link from "next/link";
import { useRouter } from "next/router";

const activeNavItemCSS =
  "rounded-md bg-gray-900 px-3 py-2 font-medium text-white";
const nonActiveNavItemCSS =
  "rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-800 hover:text-white";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="border-gray-200 bg-gray-700 px-2 py-2 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <a href="https://flowbite.com/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            US Housing Data
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:font-medium">
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
              <Link href="/state" passHref={true}>
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
      </div>
    </nav>
  );
};

export default Navbar;
