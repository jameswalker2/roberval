import moment from "moment";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { supabase } from "../../Config/SupabaseConfig";

function Charts() {
  const [chartIncome, setChartIncome] = useState([]);
  const [chartExpense, setChartExpense] = useState([]);

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
        moment(dates.date).format("MMM/YYYY"),
      ),
    },
  };

  const expenses = {
    stroke: {
      curve: "smooth",
    },
    chart: {
      id: "area",
    },
    label: {
      show: true,
    },
    series: [
      {
        name: "Dépense",
        data:  chartExpense.map((nums) => nums.amount),
        color: "#ff2424",
        fontWeight: 800,
      },
    ],
    xaxis: {
      type: "datetime",
      categories: chartIncome.map((dates) =>
        moment(dates.date).format("MMM/YYYY"),
      ),
    },

  };

  useEffect(() => {
    async function fetchDataChart() {
      const incomeData = await supabase.from("income").select("date, amount");
      if (incomeData.data) {
        setChartIncome(incomeData.data.map((entry) => entry));
      }

      const expenseData = await supabase.from("expense").select("amount, date");
      if (expenseData.data) {
        setChartExpense(expenseData.data.map((entry) => entry));
      }
    }

    fetchDataChart();
  }, [chartIncome, chartExpense]);

  console.log(chartIncome);
  return (
    <div>
      {chartIncome.length > 0 || chartExpense.length > 0 ? (
        <div className="flex">
          <Chart
            type="area"
            options={incomes}
            series={incomes.series}
            width={"530"}
            height={"300"}
            className={"mr-10"}
          />
          <Chart
            type="area"
            options={expenses}
            series={expenses.series}
            width={"530"}
            height={"300"}
          />
        </div>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
}

export default Charts;
