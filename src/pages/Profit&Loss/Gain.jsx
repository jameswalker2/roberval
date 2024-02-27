import { Button, DatePicker } from "antd";
import { Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { NavBar } from "../../components/Navbar/NavBar";

const { RangePicker } = DatePicker;
function Gain() {
  return (
    <>
      <NavBar />
      <div className="h-screen overflow-y-scroll pl-64 py-5 bg-primaryColor bg-opacity-10">
        <div
          className={
            "text-sm breadcrumbs flex items-center justify-between w-[95%] h-16 p-4 " +
            "text-supportingColor1 bg-white rounded-lg shadow-sm"
          }>
          <h1 className="font-semibold text-2xl">Staffs</h1>
          <ul>
            <li>
              <NavLink className="text-supportingColor1" to={"/dashboard"}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className="text-supportingColor1" to={"/caisse"}>
                Caisse
              </NavLink>
            </li>
            <li>
              <NavLink className="text-supportingColor1" to={"/gain"}>
                Profit & Perte
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <div className="font-medium text-supportingColor1 mb-5">
            <h2>Sélectionnez les critères</h2>
          </div>
          <div className="flex flex-wrap justify-center">
            <RangePicker
              className="w-[40rem] border-primaryColor border-2 rounded-lg bg-white
              focus:file-input-primaryColor"
            />
            <Button
              type="search"
              className="btn btn-xs text-xs h-10 w-32 ml-20 border-none text-white bg-primaryColor
              hover:bg-slate-100 hover:text-primaryColor active:bg-slate-100">
              <Search size={20} />
              Search
            </Button>
          </div>
        </div>

        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <div className="font-medium text-supportingColor1 mb-5">
            <h2>Profit et perte</h2>
          </div>
          <div className="overflow-y-hidden overflow-x-auto h-auto mt-10 rounded-lg bg-white p-4">
            <table className="table table-xs">
              <thead
                key="thead"
                className="text-supportingColor1 text-sm bg-primaryColor bg-opacity-10">
                <tr>
                  <th>Date</th>
                  <th>Revenu</th>
                  <th>Dépense</th>
                  <th>Profit ou Perte</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody key={"student.id"} className="font-semibold">
                <tr>
                  <td>0</td>
                  <td>$ 20000</td>
                  <td>$ 1000</td>
                  <td>$ 1000</td>
                  <td>
                    <button className="btn bg-color2 hover:bg-supportingColor1 text-white btn-xs">
                      Détails
                    </button>
                    <button className="btn bg-red-600 hover:bg-red-700 text-white btn-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gain;
