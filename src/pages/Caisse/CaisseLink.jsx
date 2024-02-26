import { Card } from "antd";
import Chart from "react-apexcharts";
import { NavLink } from "react-router-dom";

function CaisseLink() {
  const incomes = {
    chart: {
      id: "sparkline1",
      group: "sparklines",
      type: "area",
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "straight",
      size: 0,
    },
    fill: {
      opacity: 0,
    },

    series: [
      {
        name: "Revenu",
        data: [20, 23, 56, 89, 89, 150],
      },
    ],
    labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),

    colors: ["#5AD374"],
    title: { undefined },
    subtitle: {
      undefined,
    },
  };

  const expenses = {
    chart: {
      id: "sparkline2",
      group: "sparkline",
      type: "area",
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "straight",
      size: 0,
    },
    fill: {
      opacity: 0,
    },

    series: [
      {
        name: "Dépense",
        data: [20, 203, 0, 89, 89, 200, 600],
      },
    ],
    labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),

    colors: ["#FD6477"],
    title: { undefined },
    subtitle: {
      undefined,
    },
  };

  const gain = {
    chart: {
      id: "sparkline3",
      group: "sparklin",
      type: "area",
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "straight",
      size: 0,
    },
    fill: {
      opacity: 0,
    },

    series: [
      {
        name: "Profit",
        data: [200, 20, 560, 89, 163],
      },
    ],
    labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),

    colors: ["#2556eb"],
    title: { undefined },
    subtitle: {
      undefined,
    },
  };

  return (
    <>
      <div className="flex flex-wrap">
        <NavLink to={"/income"} id="revenu">
          <Card
            className="w-96 max-xs-w mt-10 mr-8 p-0 m-0 shadow-sm 
          transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="stat p-0">
              <div className="stat-title text-supportingColor1">
                Total Revenu
              </div>
              <div className="stat-value text-supportingColor2">25.6K</div>
              <div className="stat-desc text-slate-500">
                <span className="bg-supportingColor2 text-supportingColor2 bg-opacity-20 font-semibold p-1.5 rounded-lg mr-2">
                  + 21%
                </span>
                Que le mois dernier
              </div>
              <div className="stat-figure text-supportingColor1">
                <Chart
                  options={incomes}
                  series={incomes.series}
                  type="area"
                  height={100}
                  width={160}
                />
              </div>
            </div>
          </Card>
        </NavLink>

        <NavLink to={"/expense"} id="expense">
          <Card className="w-96 max-xs-w mt-10 mr-8 shadow-sm transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="stat p-0">
              <div className="stat-title text-supportingColor1">
                Total Dépense
              </div>
              <div className="stat-value text-supportingColor3">25.6K</div>
              <div className="stat-desc text-slate-500">
                <span className="bg-supportingColor3 text-supportingColor3 bg-opacity-20 font-semibold p-1.5 rounded-lg mr-2">
                  - 2%
                </span>
                Que le mois dernier
              </div>
              <div className="stat-figure text-supportingColor1">
                <Chart
                  options={expenses}
                  series={expenses.series}
                  type="area"
                  height={100}
                  width={160}
                />
              </div>
            </div>
          </Card>
        </NavLink>

        <NavLink to={"/gain"} id="bank">
          <Card className="w-96 max-xs-w mt-10 mr-8 shadow-sm transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="stat p-0">
              <div className="stat-title text-supportingColor1">
                Total Profit & Perte
              </div>
              <div className="stat-value text-primaryColor">25.6K</div>
              <div className="stat-desc text-slate-500">
                <span className="bg-primaryColor text-primaryColor bg-opacity-20 font-semibold p-1.5 rounded-lg mr-2">
                  + 19%
                </span>
                Que le mois dernier
              </div>
              <div className="stat-figure text-supportingColor1">
                <Chart
                  options={gain}
                  series={gain.series}
                  type="area"
                  height={100}
                  width={160}
                />
              </div>
            </div>
          </Card>
        </NavLink>
      </div>
    </>
  );
}

export default CaisseLink;
