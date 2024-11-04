import LogoDark from "@/assets/pica_logo.jpg";
import LogoLight from "@/assets/pica_logo.jpg";
import { Link } from "react-router-dom";

export const SideMenuLogo = ({ to }: { to: "/home" | "/" }) => {
  return (
    <div className="hidden justify-center my-6 sm-h:flex">
      <Link to={to} className="flex flex-col cursor-pointer">
        <img
          className="h-40 w-40 hidden dark:block"
          src={LogoDark}
          alt="Logo"
        />
        <img className="h-40 w-40 dark:hidden" src={LogoLight} alt="Logo" />
        <h2 className="font-bold italic text-center text-2xl">YumLab</h2>
      </Link>
    </div>
  );
};

export const TopMenuLogo = ({ to }: { to: "/home" | "/" }) => {
  return (
    <Link
      to={to}
      className="hidden lg:flex lg:items-center lg:gap-x-1 italic font-bold rounded-full cursor-pointer"
    >
      <img className="h-12 w-12 hidden dark:block" src={LogoDark} alt="Logo" />
      <img className="h-12 w-12 dark:hidden" src={LogoLight} alt="Logo" />
      <h2 className="font-bold italic text-center text-2xl">YumLab</h2>
    </Link>
  );
};
