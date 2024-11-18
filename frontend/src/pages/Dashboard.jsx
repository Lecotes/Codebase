import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
const Dashboard = () => {
  return (
    <>
      <Navigation />
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
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
