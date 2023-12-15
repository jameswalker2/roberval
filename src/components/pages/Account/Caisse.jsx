import { NavLink } from "react-router-dom";
import { NavBar } from "../../header/NavBar.jsx";
import { useState } from "react";
import Chart from "react-apexcharts";
import "./Caisse.scss";

export function Caisse() {
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
  return (
    <>
      <NavBar />
      <div className="container_caisse">
        <div className="card_normal">
          <NavLink
            id="revenu"
            className="card card-compact w-96 h-40 shadow-xl p-[20px] bg-slate-100">
            <h2 className="mb-5 text-xl text-slate-100 ">Income</h2>
            <h1 className="mb-3 text-4xl text-color3 font-semibold text-color">
              $5000ht
            </h1>
            <span className="">
              <p className="text-slate-100">Cliquez pour accéder</p>
            </span>
          </NavLink>
          <NavLink
            id="expense"
            className="card card-compact w-96 h-40 shadow-xl p-[20px] bg-slate-100">
            <h2 className="mb-5 text-xl text-slate-100">Expense</h2>
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
              <div>
                <h2 className="mr-40 font-semibold">Joseph Jhonny</h2>
                <p>Income</p>
              </div>
              <div className="mb-2">
                <p className="mr-48">12/12/2023</p>
                <h2 className="font-semibold text-green-500">$2000ht</h2>
              </div>
              <div>
                <h2 className="mr-40 font-semibold">Joseph Jhonny</h2>
                <p>Income</p>
              </div>
              <div className="mb-2">
                <p className="mr-48">12/12/2023</p>
                <h2 className="font-semibold text-green-500">$2000ht</h2>
              </div>
              <div>
                <h2 className="mr-40 font-semibold">Joseph Jhonny</h2>
                <p>Income</p>
              </div>
              <div className="mb-2">
                <p className="mr-48">12/12/2023</p>
                <h2 className="font-semibold text-red-500">$200ht</h2>
              </div>
              <div>
                <h2 className="mr-40 font-semibold">Joseph Jhonny</h2>
                <p>Income</p>
              </div>
              <div className="mb-2">
                <p className="mr-48">12/12/2023</p>
                <h2 className="font-semibold text-green-500">$2000ht</h2>
              </div>
              <div>
                <h2 className="mr-40 font-semibold">Joseph Jhonny</h2>
                <p>Income</p>
              </div>
              <div className="mb-2">
                <p className="mr-48">12/12/2023</p>
                <h2 className="font-semibold text-green-500">$2000ht</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
