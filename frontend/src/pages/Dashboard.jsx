import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <>
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
      <div className="full-screen py-[5rem]">
        <div className="container">
          <div className="flex gap-10">
            <div className="flex-1">
              <table className="tbl">
                <thead className="tbl-head">
                  <tr className="">
                    <th scope="col" className="py-4 px-[10px]">
                      Filename
                    </th>
                    <th scope="col" className="py-4">
                      Creation Date
                    </th>
                    <th scope="col" className="py-4">
                      Public
                    </th>
                    <th scope="col" className="py-4">
                      Users
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white text-primary">
                    <td className="tbl-content-header py-4">Shared Work1</td>
                    <td className="tbl-content py-4">Oct 20, 2022</td>
                    <td className="tbl-content py-4">
                      <div className="checkbox relative">
                        <input type="checkbox" id="checkbox" />
                      </div>
                    </td>
                    <td className="tbl-content py-4 flex flex-row">
                      <div className="group-letter">C</div>
                      <div className="group-letter left-[-9px]">A</div>
                      <div className="group-letter left-[-20px]">B</div>
                    </td>
                  </tr>
                  <tr className="bg-white text-primary">
                    <td className="tbl-content-header py-4">Shared Work1</td>
                    <td className="tbl-content py-4">Oct 20, 2022</td>
                    <td className="tbl-content py-4">
                      <div className="checkbox relative">
                        <input type="checkbox" id="checkbox" />
                      </div>
                    </td>
                    <td className="tbl-content py-4">Everyone</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-[300px]">sidebar</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
