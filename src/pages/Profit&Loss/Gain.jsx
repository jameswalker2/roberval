import { DatePicker } from "antd";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { NavBar } from "../../components/Navbar/NavBar";
import CaisseLink from "./CaisseLink";

const { RangePicker } = DatePicker;

export default function Gain() {
  const [dateRange, setDateRange] = useState([]);
  const [dataIncome, setDataIncome] = useState([]);
  const [dataExpense, setDataExpense] = useState([]);
  const [date, setDate] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [profit, setProfit] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showPeriod, setShowPeriod] = useState(false);
  const [showAnnual, setShowAnnual] = useState(false);
  const [hidePeriod, setHidePeriod] = useState(false);
  const [test, setTest] = useState(false);
  const [chartDataG, setChartDataG] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenu",
        data: [1200, 1500, 1800, 1400, 2000, 2200],
        fill: true,
        backgroundColor: "rgba(10, 700, 122, 0.2)",
        borderColor: "rgb(10, 700, 122)",
        borderWidth: 2,
      },
      {
        label: "Dépense",
        data: [100, 500, 1800, 100, 10000, 200],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
      },
      {
        label: "Perte",
        data: [1000, 1000, 1000, 1000, 1000, 1000],
        fill: true,
        backgroundColor: "rgba(255, 215, 132, 0.2)",
        borderColor: "rgb(255, 99, 15)",
        borderWidth: 2,
      },
    ],
  });

  const hide = () => {
    setHidePeriod(false);
  };

  // const handleSearch = async () => {
  //   if (dateRange.length === 2) {
  //     try {
  //       const { data: income, error: incomeError } = await supabase
  //         .from("income")
  //         .select()
  //         .gt("date", dateRange[0])
  //         .lte("date", dateRange[1]);

  //       if (incomeError) {
  //         throw incomeError;
  //       } else {
  //         setDataIncome(income);
  //         calculateTotalIncome(income);
  //       }

  //       const { data: expense, error: expenseError } = await supabase
  //         .from("expense")
  //         .select()
  //         .gte("date", dateRange[0])
  //         .lte("date", dateRange[1]);

  //       if (expenseError) {
  //         throw expenseError;
  //       } else {
  //         setDataExpense(expense);
  //         calculateTotalExpense(expense);
  //       }
  //       setShowResult(true);
  //       setProfit(totalIncome - totalExpense);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  // };

  // const calculateTotalIncome = (data) => {
  //   let total = 0;
  //   data.forEach((item) => {
  //     total += item.amount;
  //     setDate(item.date);
  //   });
  //   setTotalIncome(total);
  //   setProfit(totalIncome - totalExpense);
  // };

  // const calculateTotalExpense = (data) => {
  //   let total = 0;
  //   data.forEach((item) => {
  //     total += item.amount;
  //   });
  //   setTotalExpense(total);
  //   setProfit(totalIncome - totalExpense);
  // };

  const options = {
    scales: {
      x: {
        display: true,
      },
      y: {
        beginAtZero: true,
        display: true,
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

  const handleResetHideP = (hideP) => {
    if (hideP) {
      setShowPeriod(false);
    }
  };

  const handleResetHideA = (hideA) => {
    if (hideA) {
      setShowAnnual(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="h-screen overflow-y-scroll pl-64 py-5 bg-primaryColor bg-opacity-10">
        <div className="w-[95%] p-4 text-supportingColor1 bg-white rounded-lg shadow-sm mb-10">
          <h1 className="font-semibold text-2xl">Dashboard profit & perte</h1>
        </div>

        <div
          className="w-[95%] p-4 text-supportingColor1 bg-white rounded-lg shadow-sm 
        flex items-center justify-between">
          <div>
            <h2>Total Balance :</h2>
            <p className="text-4xl font-semibold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              500,000 Ht
            </p>
          </div>
          <div className="flex items-center">
            <RangePicker
              className="w-60 h-10 mr-5 border-primaryColor border-2 rounded-lg bg-white
              focus:file-input-primaryColor"
            />
            <button
              type="search"
              className="btn btn-xs text-xs h-10 w-24 border-none text-white bg-primaryColor
              hover:bg-slate-100 hover:text-primaryColor active:bg-slate-100">
              Search
            </button>
          </div>
        </div>

        <div className="w-[95%] mt-10 flex justify-between">
          <CaisseLink />
          <div className="w-[80%] p-4 bg-white rounded-lg shadow-sm">
            <div className="mb-5">Dashboard</div>
            <div>
              <Line
                className="h-80 w-40 "
                data={chartDataG}
                options={options}
              />
            </div>
            <div className="text-center">dsfd</div>
          </div>
        </div>

        <div className="w-[95%] p-4 mt-10 bg-white rounded-lg shadow-sm">
          <div className="font- text-supportingColor1 mb-5">
            <h2>Plus détails</h2>
          </div>
          <div className="overflow-y-hidden overflow-x-auto h-auto mt-10 rounded-lg bg-white p-4">
            <table className="table table-xs">
              <thead
                key="thead"
                className="text-supportingColor1 text-sm bg-primaryColor bg-opacity-10">
                <tr>
                  <th>Date</th>
                  <th>Revenu</th>
                  <th>Dépense</th>
                  <th>Profit ou Perte</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody key={"student.id"} className="font-semibold">
                <tr>
                  <td>0</td>
                  <td>$ 20000</td>
                  <td>$ 1000</td>
                  <td>$ 1000</td>
                  <td>
                    <button className="btn bg-color2 hover:bg-supportingColor1 text-white btn-xs">
                      Détails
                    </button>
                    <button className="btn bg-red-600 hover:bg-red-700 text-white btn-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {showResult && dateRange.length === 2 && (
            <div>
              <table className="table table-xs">
                <thead className="text-color2 text-sm bg-gray-50 hover:bg-gray-100">
                  <tr>
                    <th>Date</th>
                    <th>Revenu</th>
                    <th>Dépense</th>
                    <th>Profit ou Perte</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-2xl font-semibold">
                  <tr>
                    <td>
                      {dateRange[0].format("DD/MM/YYYY")} -{" "}
                      {dateRange[1].format("DD/MM/YYYY")}
                    </td>
                    <td>$ {totalIncome}</td>
                    <td>$ {totalExpense}</td>
                    <td>$ {profit}</td>
                    <td>
                      <button className="btn bg-color2 hover:bg-color1 text-white btn-xs">
                        Détails
                      </button>
                      <button className="btn bg-red-600 hover:bg-red-700 text-white btn-xs">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
