import { Card } from "antd";
import { Circle } from "lucide-react";
import { NavBar } from "../../components/Navbar/NavBar.jsx";
import CardLink from "./CardLink.jsx";
import ChartsIncome from "./ChartsIncome.jsx";
import "./Dashboard.scss";

export function Dashboard() {
  return (
    <>
      <NavBar />
      <div className="h-screen overflow-y-scroll pl-64 py-5 bg-primaryColor bg-opacity-10">
        <div className="w-[95%] h-16 p-4 text-supportingColor1 bg-white rounded-lg shadow-sm">
          <h1 className="font-semibold text-2xl">Dashboard</h1>
        </div>

        <div>
          <CardLink />
        </div>

        <div className="flex flex-wrap mt-10">
          <Card className={"w-[95%] h-auto p-0 m-0"}>
            <div className="flex flex-auto ">
              <div className="flex flex-auto mb-10">
                <h4 className="text-supportingColor1 font-medium flex items-center ">
                  <Circle className="text-supportingColor2 bg-supportingColor2 rounded-full w-2 h-2 mr-2" />
                  Revenu
                </h4>
                <h4 className="text-supportingColor1 font-medium flex items-center ">
                  <Circle className="text-supportingColor3 bg-supportingColor3 rounded-full w-2 h-2 mr-2 ml-5" />
                  Dépense
                </h4>
              </div>
              <div>
                <select
                  className="w-20 h-6 rounded-full px-2 bg-white border-primaryColor border-2"
                  name=""
                  id="">
                  <option value="">2023</option>
                  <option value="">2024</option>
                </select>
              </div>
            </div>
            <ChartsIncome />
          </Card>
          {/* <Card className={"w-[45%] h-96 ml-16"}>
							<h4 className="text-supportingColor1 font-medium text-[20px] ">
								Dépense
							</h4>
							<div>
								<ChartsExpense/>
							</div>
						</Card> */}
        </div>
      </div>
    </>
  );
}
