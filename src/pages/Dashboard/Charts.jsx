import moment from "moment";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { supabase } from "../../Config/SupabaseConfig";

function Charts() {
  const [chartIncome, setChartIncome] = useState([]);
  const [chartExpense, setChartExpense] = useState([]);

  const options = {
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
      {
        name: "Dépense",
        data: chartExpense.map((nums) => nums.amount),
        color: "#ff2424",
        fontWeight: 800,
      },
    ],
    xaxis: {
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
  return (
    <div>
      <Chart
        type="area"
        options={options}
        series={options.series}
        width={"950"}
        height={"300"}
      />
    </div>
  );
}

export default Charts;
