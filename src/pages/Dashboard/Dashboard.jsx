import { Card } from "antd";
import { NavBar } from "../../components/Navbar/NavBar.jsx";
import CardLink from "./CardLink.jsx";
import Charts from "./Charts.jsx";
import "./Dashboard.scss";

export function Dashboard() {
  return (
    <>
      <NavBar />
      <div className="h-screen pl-64 py-5 bg-primaryColor bg-opacity-10">
        <div className="w-[95%] h-16 p-4 text-supportingColor1 bg-white rounded-lg shadow-sm">
          <h1 className="font-semibold text-2xl">Dashboard</h1>
        </div>

        <div>
          <CardLink />
        </div>

        <div>
          <Card className={"mt-10 w-[95%] h-96 "}>
            <h4 className="text-supportingColor1 font-medium text-[20px] ">
              Balance
            </h4>
            <Charts />
          </Card>
        </div>
      </div>
    </>
  );
}
