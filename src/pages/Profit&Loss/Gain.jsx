import { SearchOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import { NavBar } from "../../components/Navbar/NavBar";

const { RangePicker } = DatePicker;
function Gain() {
  return (
    <>
      <NavBar />
      <div className="h-screen px-52 py-10">
        <div className="bg-white rounded-2xl w-[80rem] h-auto p-5">
          <div className="text-[20px] font-medium text-color1 mb-5">
            <h2>Sélectionnez les critères</h2>
          </div>
          <div className="flex justify-center">
            <RangePicker className="w-[40rem]" />
            <button
              type="search"
              className="btn bg-color2 text-white hover:bg-color1 ml-10 w-32">
              <SearchOutlined />
              Search
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl w-[80rem] h-auto mt-20 p-5">
          <div className="text-[20px] font-medium text-color1 mb-5">
            <h2>Profit et perte</h2>
          </div>
          <div>
            <table className="table table-xs">
              <thead
                key="thead"
                className="text-color2 text-sm bg-gray-50 hover:bg-gray-100">
                <tr>
                  <th>Date</th>
                  <th>Revenu</th>
                  <th>Dépense</th>
                  <th>Profit ou Perte</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody key={"student.id"} className="text-2xl font-semibold">
                <tr>
                  <td>0</td>
                  <td>$ 20000</td>
                  <td>$ 1000</td>
                  <td>$ 1000</td>
                  <td>
                    <button className="btn bg-color2 hover:bg-color1 text-white btn-xs">
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
