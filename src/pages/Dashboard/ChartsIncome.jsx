import { Empty } from "antd";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { supabase } from "../../Config/SupabaseConfig";

Chart.register(CategoryScale);

function Charts() {
  const [chartData, setChartData] = useState({
    labels: [], // Initialise un tableau vide pour les étiquettes
    datasets: [
      {
        label: "Revenu",
        data: [],
        fill: true,
        backgroundColor: "rgba(10, 700, 122, 0.2)",
        borderColor: "rgb(10, 700, 122)",
        borderWidth: 2,
      },
      {
        label: "Dépense",
        data: [],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    async function fetchDataChart() {
      try {
        const { data: incomeData, error: incomeError } = await supabase
          .from("income")
          .select("date, amount");
        const { data: expenseData, error: expenseError } = await supabase
          .from("expense")
          .select("date, amount");

        if (incomeError || expenseError) {
          console.error(
            "Erreur lors de la récupération des données :",
            incomeError || expenseError,
          );
        } else {
          const incomeLabels = incomeData.map((entry) =>
            dayjs(entry.date).format("MMMM"),
          );
          const expenseLabels = expenseData.map((entry) =>
            dayjs(entry.date).format("MMMM"),
          );
          const incomeAmounts = incomeData.map((entry) => entry.amount);
          const expenseAmounts = expenseData.map((entry) => entry.amount);

          const allLabels = [...new Set([...incomeLabels, ...expenseLabels])];

          const incomeByMonth = Array(allLabels.length).fill(0);
          const expenseByMonth = Array(allLabels.length).fill(0);

          incomeLabels.forEach((label, index) => {
            const monthIndex = allLabels.indexOf(label);
            incomeByMonth[monthIndex] += incomeAmounts[index];
          });
          expenseLabels.forEach((label, index) => {
            const monthIndex = allLabels.indexOf(label);
            expenseByMonth[monthIndex] += expenseAmounts[index];
          });

          setChartData({
            labels: allLabels,
            datasets: [
              {
                ...chartData.datasets[0],
                data: incomeByMonth,
              },
              {
                ...chartData.datasets[1],
                data: expenseByMonth,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    }

    fetchDataChart();
  });

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
