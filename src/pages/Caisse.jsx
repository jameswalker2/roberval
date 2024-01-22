import { NavLink } from "react-router-dom";
import { NavBar } from "../components/Navbar/NavBar.jsx";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "./Caisse.scss";
import {supabase} from "@/Config/SupabaseConfig.jsx";
import moment from "moment";

export function Caisse() {
  const [income, setIncome] = useState([])
  const [expense, setExpense] = useState([])
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4"],
        label: {
          show: true,
        },
      },
    },
    series: [
      {
        name: "Revenu",
        data: [20500, 2500, 500, 10000],
        color: "#00ff00",
      },
      {
        name: "Depense",
        data: [2800, 200, 3000, 150],
        color: "#ff2424",
        fontWeight: 800,
      },
    ],
  });

  useEffect(() => {
    const fetchDatas = async () => {

    try {
      const incomeData = await supabase
          .from('income')
          .select()

      if (incomeData.data) {
        console.log(incomeData.data)
        setIncome(incomeData.data)
      } else {
        console.log(incomeData.error)
      }

      const expenseData = await supabase
          .from('expense')
          .select()

      if(expenseData.data) {
        console.log(expenseData.data)
        setExpense(expenseData.data)
      } else {
        console.log(expenseData.error)
      }

    } catch (error) {
      console.log(error)
    }



    }

    fetchDatas()
  }, []);

  return (
    <>
      <NavBar />
      <div className="container_caisse">
        <div className="card_normal">
          <NavLink
            to={"/income"}
            id="revenu"
            className="card card-compact w-96 h-40 shadow-xl p-[20px] bg-slate-100">
            <h2 className="mb-5 text-xl text-slate-100 ">Revenu</h2>
            <h1 className="mb-3 text-4xl text-color3 font-semibold text-color">
              $5000ht
            </h1>
            <span className="">
              <p className="text-slate-100">Cliquez pour accéder</p>
            </span>
          </NavLink>
          <NavLink
            to={"/expense"}
            id="expense"
            className="card card-compact w-96 h-40 shadow-xl p-[20px] bg-slate-100">
            <h2 className="mb-5 text-xl text-slate-100">Dépense</h2>
            <h1 className="mb-3 text-4xl text-color3 font-semibold">$3000ht</h1>
            <p className="text-slate-100">Cliquez pour accéder</p>
          </NavLink>
          <NavLink
            id="bank"
            className="c2 card card-compact w-96 h-51 shadow-xl p-[20px] bg-slate-100">
            <h1 className="text-4xl text-color3 font-semibold">
              $20,000,000ht
            </h1>
            <h2 className="mb-8 text-slate-100">Balance du compte</h2>
            <p className="text-slate-100">Cliquez pour accéder</p>
          </NavLink>
        </div>
        <div className="card_secondaire">
          <div className="card_chart">
            <h2 className="text-[25px] font-semibold text-color1">
              $20,000,502ht
            </h2>
            <p className="text-[15px] ">Total Balance du Dec</p>
            <Chart
              options={state.options}
              series={state.series}
              type="area"
              width={"720"}
              height={"310"}
            />
          </div>
          <div className="card_recent">
            <div className="title_recent">
              <h2 className="text-[20px] font-semibold">Mes Transactions</h2>
              <p className="text-[15px]">Informations récentes</p>
            </div>
            <div className="content_recent mt-5">
              {income.map((incom) => (
              <div className="flex flex-wrap">
                <h2 className="mr-40 font-semibold">{incom.name}</h2>
                <p>{incom.type}</p>
                <h3>{moment(incom.date).format("DD/MM/YYYY")}</h3>
                <p className="ml-[8.2rem]">{incom.type}</p>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
