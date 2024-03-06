import { Card } from "antd";
import { NavBar } from "../../components/Navbar/NavBar.jsx";
import CardLink from "./CardLink.jsx";
import ChartsExpense from "./ChartsExpense.jsx";
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
          <Card className={"w-[45%] h-96 p-0 m-0"}>
            <h4 className="text-supportingColor1 font-medium text-[20px] ">
              Revenu
            </h4>
            <ChartsIncome />
          </Card>
          <Card className={"w-[45%] h-96 ml-16"}>
            <h4 className="text-supportingColor1 font-medium text-[20px] ">
              Dépense
            </h4>
            <div>
              <ChartsExpense />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
