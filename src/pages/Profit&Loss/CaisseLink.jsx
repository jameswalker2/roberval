import { useState } from "react";
import { Line } from "react-chartjs-2";

function CaisseLink() {
  const [chartDataIncome, setChartDataIncome] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Revenue",
        data: [1200, 1500, 1800, 1400, 2000, 2200],
        fill: true,
        backgroundColor: "rgba(10, 700, 122, 0.2)",
        borderColor: "rgb(10, 700, 122)",
        borderWidth: 2,
      },
    ],
  });

  const [chartDataExpense, setChartDataExpense] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Revenue",
        data: [100, 500, 1800, 100, 10000, 200],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
      },
    ],
  });

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        display: false,
      },
      y: {
        beginAtZero: true,
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <>
      <div>
        <div className="w-[90%] bg-white max-xs-w mr-8 p-4 m-0 rounded-lg shadow-sm">
          <div className="">
            <div className="stat-title flex items-center text-supportingColor1">
              <h1>Total Revenu</h1>
              <span className="text-supportingColor2 bg-opacity-20 font-semibold p-1.5 rounded-lg ml-2">
                + 21%
              </span>
            </div>
            <div className="stat-value text-supportingColor2">25.6K</div>
            <div className="stat-figure text-supportingColor1">
              <Line
                className="h-auto w-40 "
                data={chartDataIncome}
                options={options}
              />
            </div>
          </div>
        </div>

        <div className="w-[90%] bg-white max-xs-w mr-8 p-4 m-0 rounded-lg shadow-sm mt-10">
          <div className="">
            <div className="stat-title flex items-center text-supportingColor1">
              <h1>Total Dépense</h1>
              <span className="text-supportingColor3 bg-opacity-20 font-semibold p-1.5 rounded-lg ml-2">
                - 10%
              </span>
            </div>
            <div className="stat-value text-supportingColor3">25.6K</div>
            <div className="stat-figure text-supportingColor1">
              <Line
                className="h-auto w-40 "
                data={chartDataExpense}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CaisseLink;
