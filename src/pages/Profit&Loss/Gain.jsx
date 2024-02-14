import { DatePicker } from "antd";
import { useState } from "react";
import { supabase } from "../../Config/SupabaseConfig";
import { NavBar } from "../../components/Navbar/NavBar";

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

  const handleSearch = async () => {
    if (dateRange.length === 2) {
      try {
        const { data: income, error: incomeError } = await supabase
          .from("income")
          .select()
          .gt("date", dateRange[0])
          .lte("date", dateRange[1]);

        if (incomeError) {
          throw incomeError;
        } else {
          setDataIncome(income);
          calculateTotalIncome(income);
        }

        const { data: expense, error: expenseError } = await supabase
          .from("expense")
          .select()
          .gte("date", dateRange[0])
          .lte("date", dateRange[1]);

        if (expenseError) {
          throw expenseError;
        } else {
          setDataExpense(expense);
          calculateTotalExpense(expense);
        }
        setShowResult(true);
        setProfit(totalIncome - totalExpense);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const calculateTotalIncome = (data) => {
    let total = 0;
    data.forEach((item) => {
      total += item.amount;
      setDate(item.date);
    });
    setTotalIncome(total);
    setProfit(totalIncome - totalExpense);
  };

  const calculateTotalExpense = (data) => {
    let total = 0;
    data.forEach((item) => {
      total += item.amount;
    });
    setTotalExpense(total);
    setProfit(totalIncome - totalExpense);
  };

  return (
    <>
      <NavBar />
      <div className="h-screen pl-56 pt-24">
        <div className="card bg-white rounded-2xl w-[95%] p-5">
          <div className="text-[20px] font-medium text-color1 mb-5">
            <h2>Sélectionnez les critères</h2>
          </div>
          <div className=" flex justify-center">
            <RangePicker
              onChange={(dates) => setDateRange(dates)}
              className="w-[40rem]"
            />
            <button
              type="search"
              onClick={handleSearch}
              className="btn bg-color2 text-white hover:bg-color1 ml-10 w-32">
              Recherche
            </button>
          </div>
        </div>
        <div className="card bg-white rounded-2xl w-[95%] h-auto mt-20 p-5">
          <div className="text-[20px] font-medium text-color1 mb-5">
            <h2>Liste de Profit et perte</h2>
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
