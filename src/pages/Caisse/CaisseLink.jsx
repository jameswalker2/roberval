import { Card } from "antd";
import Chart from "react-apexcharts";
import { NavLink } from "react-router-dom";

function CaisseLink() {
  const incomes = {
    chart: {
      id: "sparkline1",
      group: "sparklines",
      type: "area",
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "straight",
    },
    fill: {
      opacity: 1,
    },
    series: [
      {
        name: "Sales",
        data: [20, 23, 56, 89, 89],
      },
    ],
    labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),
    yaxis: {
      min: 0,
    },
    xaxis: {
      type: "datetime",
      labels: {
        show: false, // Cache les étiquettes de l'axe x
      },
    },
    colors: ["#DCE6EC"],
    title: {
      text: "$424,652",
      offsetX: 30,
      style: {
        fontSize: "24px",
        cssClass: "apexcharts-yaxis-title",
      },
    },
    subtitle: {
      text: "Sales",
      offsetX: 30,
      style: {
        fontSize: "14px",
        cssClass: "apexcharts-yaxis-title",
      },
    },
  };

  return (
    <div>
      <div className="flex flex-wrap mb-10">
        <NavLink to={"/income"} id="revenu">
          <Card className="w-96 max-xs-w mt-10 mr-8 shadow-sm transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300">
            <Chart
              options={incomes}
              series={incomes.series}
              type="area"
              height={160}
            />
            <div
              className="apexcharts-yaxis-title"
              style={{ fontSize: "24px" }}>
              $424,652
            </div>
            <div
              className="apexcharts-yaxis-title"
              style={{ fontSize: "14px" }}>
              Sales
            </div>
          </Card>
        </NavLink>

        <NavLink to={"/expense"} id="expense">
          <Card className="w-96 max-xs-w mt-10 mr-8 shadow-sm transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="stat-figure text-primary"></div>
            <div className="stat-title text-supportingColor1">
              Total Dépense
            </div>
            <div className="stat-value text-supportingColor3">25.6K</div>
            <div className="stat-desc text-slate-500">
              21% more than last month
            </div>
          </Card>
        </NavLink>

        <NavLink to={"/gain"} id="bank">
          <Card className="w-96 max-xs-w mt-10 mr-8 shadow-sm transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="stat-figure text-primary"></div>
            <div className="stat-title text-supportingColor1">
              Total Profit & Perte
            </div>
            <div className="stat-value text-primaryColor">25.6K</div>
            <div className="stat-desc text-slate-500">
              21% more than last month
            </div>
          </Card>
        </NavLink>
      </div>
    </div>
  );
}

export default CaisseLink;
