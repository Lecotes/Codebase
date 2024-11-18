import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Navigation = () => {
  return (
    <nav className="bg-white fixed w-full z-10 h-[96px] border-b-[#e0e3e7] border-solid border-[1px] relative">
      <div className="content p-5 flex flex-wrap items-center">
        <div className="lg:w-0/6 flex pr-20">
          <Link href="/" className="flex items-center">
            <img src={logo} className="w-[7rem] lg:w-[80px]" />
          </Link>
        </div>
        <div className="lg:w-1/6 flex">
          <input type="text" placeholder="Search" className="nav-search" />
        </div>
        <div className="lg:w-4/6 flex justify-end">
          <div className="user-letter">A</div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
