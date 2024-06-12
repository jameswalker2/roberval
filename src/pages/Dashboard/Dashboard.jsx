import { Card, Tooltip } from "antd";
import { Circle, FileText, Sheet } from "lucide-react";
import { useState } from "react";
import { NavBar } from "../../components/Navbar/NavBar.jsx";
import CardLink from "./CardLink.jsx";
import Charts from "./Charts.jsx";
import "./Dashboard.scss";

export function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [submittedExcel, setSubmittedExcel] = useState(false);
  const [submittedPdf, setSubmittedPdf] = useState(false);

  setTimeout(() => {
    setSubmittedExcel(false);
    setSubmittedPdf(false);
  }, 0);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };
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
            <div className="flex justify-between mb-10">
              <div className="flex">
                <h4 className="text-supportingColor1 font-medium flex items-center ">
                  <Circle className="text-supportingColor2 bg-supportingColor2 rounded-full w-2 h-2 mr-2" />
                  Revenu
                </h4>
                <h4 className="text-supportingColor1 font-medium flex items-center ">
                  <Circle className="text-supportingColor3 bg-supportingColor3 rounded-full w-2 h-2 mr-2 ml-5" />
                  Dépense
                </h4>
              </div>
              <div className="flex items">
                <Tooltip title="Excel">
                  <button
                    onClick={() => setSubmittedExcel(true)}
                    className="text-primaryColor mr-4">
                    <Sheet strokeWidth={1.25} />
                  </button>
                </Tooltip>
                <Tooltip title="Pdf">
                  <button
                    onClick={() => setSubmittedPdf(true)}
                    className="text-primaryColor mr-4">
                    <FileText strokeWidth={1.25} />
                  </button>
                </Tooltip>

                <select
                  value={selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="w-auto h-6 rounded-lg px-2 bg-white border-primaryColor border-2">
                  <option value="2023">Année 2023</option>
                  <option value="2024">Année 2024</option>
                  <option value="2025">Année 2025</option>
                </select>
              </div>
            </div>
            <Charts
              selectedYear={selectedYear}
              clickExcel={submittedExcel}
              clickPdf={submittedPdf}
            />
          </Card>
        </div>
      </div>
    </>
  );
}
