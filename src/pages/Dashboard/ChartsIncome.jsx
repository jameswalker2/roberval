import { Empty } from "antd";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { supabase } from "../../Config/SupabaseConfig";

Chart.register(CategoryScale);

function Charts() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    async function fetchDataChart() {
      const { data: incomeData, error: incomeError } = await supabase
        .from("income")
        .select("date, amount");
      const { data: expenseData, error: expenseError } = await supabase
        .from("expense")
        .select("date, amount");

      if (incomeError || expenseError) {
        console.error("Error fetching data:", incomeError || expenseError);
      } else {
        const incomeLabels = incomeData.map((entry) =>
          dayjs(entry.date).format("MMM"),
        );
        const expenseLabels = expenseData.map((entry) =>
          dayjs(entry.date).format("MMM"),
        );
        const incomeAmounts = incomeData.map((entry) => entry.amount);
        const expenseAmounts = expenseData.map((entry) => entry.amount);
        const myIncomeLabels = incomeLabels.filter((label) =>
          dayjs(label).isSameOrBefore(dayjs(new Date())),
        );
        // const myExpenseLabels = expenseLabels.filter((label) =>
        //   dayjs(label).isSameOrBefore(dayjs(new Date())),
        // );
        console.log(incomeLabels);
        setChartData({
          labels: myIncomeLabels,
          datasets: [
            {
              label: "Revenu",
              data: incomeAmounts,
              fill: true,
              backgroundColor: "rgb(10, 700, 122, 0.2)",
              borderColor: "rgb(10, 700, 122)",
              borderWidth: 2,
            },
            {
              label: "Dépense",
              data: expenseAmounts,
              fill: true,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgb(255, 99, 132)",
              borderWidth: 2,
            },
          ],
        });
      }
    }

    fetchDataChart();
  }, []);

  return (
    <div>
      {chartData.labels.length > 0 ? (
        <Line
          className="h-96 w-96 "
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default Charts;
