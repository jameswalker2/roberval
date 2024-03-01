import { Empty } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { supabase } from "../../Config/SupabaseConfig";

function Charts() {
  const [chartIncome, setChartIncome] = useState([]);

  const incomes = {
    stroke: {
      curve: "smooth",
    },
    chart: {
      id: "basic-bar",
    },
    label: {
      show: true,
    },
    series: [
      {
        name: "Revenu",
        data: chartIncome.map((nums) => nums.amount),
        color: "#00ff00",
      },
    ],
    xaxis: {
      categories: chartIncome.map((dates) =>
        moment(dates.date).format("DD/MMM/YYYY"),
      ),
    },
  };

  useEffect(() => {
    async function fetchDataChart() {
      const incomeData = await supabase.from("income").select("date, amount");
      if (incomeData.data) {
        setChartIncome(incomeData.data.map((entry) => entry));
      }
    }

    fetchDataChart();
  }, [chartIncome]);

  return (
    <div>
      {chartIncome.length > 0 ? (
        <div className="flex">
          <Chart
            type="area"
            options={incomes}
            series={incomes.series}
            width={"550"}
            height={"320"}
          />
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default Charts;
