import { supabase } from "@/Config/SupabaseConfig.jsx";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta.js";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { NavBar } from "../../components/Navbar/NavBar.jsx";
import "./Caisse.scss";
import CaisseLink from "./CaisseLink.jsx";

export function Caisse() {
  const [recentTransactions, setRecentTransactions] = useState([]);

  const [state] = useState({
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
        const incomeData = await supabase.from("income").select();
        const expenseData = await supabase.from("expense").select();

        const combineData = [...incomeData.data, ...expenseData.data];
        const sortedData = combineData.sort((a, b) => a.date - b.date);

        const limitedTransactions = sortedData.slice(0, 3);

        setRecentTransactions(limitedTransactions.reverse());
      } catch (error) {
        console.log(error);
      }
    };

    fetchDatas();

    const incomeChannel = supabase
      .channel("custom-insert-channel-income")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "income" },
        (payload) => {
          fetchDatas(payload);
        },
      )
      .subscribe();

    const expenseChannel = supabase
      .channel("custom-insert-channel-expense")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "expense" },
        (payload) => {
          fetchDatas(payload);
        },
      )
      .subscribe();

    return () => {
      incomeChannel.unsubscribe();
      expenseChannel.unsubscribe();
    };
  }, []);

  const generateBackgroundColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  };

  return (
    <>
      <NavBar />
      <div className="h-screen overflow-scroll pl-64 py-5 bg-primaryColor bg-opacity-10">
        <div className="text-sm breadcrumbs flex items-center justify-between w-[95%] h-16 p-4 text-supportingColor1 bg-white rounded-lg shadow-sm">
          <h1 className="font-semibold text-2xl">Caisse</h1>
          <ul>
            <li>
              <NavLink className="text-supportingColor1" to={"/paiement"}>
                Paiement
              </NavLink>
            </li>
            <li>
              <NavLink className="text-supportingColor1" to={"/payroll"}>
                Payroll
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <CaisseLink />
        </div>

        <div className="flex flex-wrap">
          <div className="w-[62.5%] p-4 rounded-lg bg-white mt-10 shadow-sm">
            <h2 className="font-medium text-supportingColor1">
              Balance revenu/dépense
            </h2>
            <Chart
              options={state.options}
              series={state.series}
              type="area"
              width={"95%"}
              height={"100%"}
            />
          </div>

          <div className="w-[30%] p-4 rounded-lg bg-white ml-8 mt-10 shadow-sm">
            <h2 className="text-supportingColor1 font-medium">
              Transactions récentes
            </h2>
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex ">
                <Card
                  style={{
                    width: 350,
                    marginTop: 10,
                    border: "1px solid #ddd", // Ajoutez une bordure
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}>
                  <div className="flex items-center justify-between">
                    <Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: generateBackgroundColor(),
                            verticalAlign: "middle",
                          }}
                          size="large">
                          {transaction.name.charAt(0).toUpperCase()}
                        </Avatar>
                      }
                      title={transaction.name}
                      description={transaction.what || transaction.type}
                    />
                    <div className="flex items-center">
                      <h2 className="font-semibold mr-2">
                        $ {transaction.amount}
                      </h2>
                      {transaction.type === "Donnation" ||
                      transaction.type === "Frais Scolaire" ? (
                        <FaArrowUp className="text-green-600" />
                      ) : (
                        <FaArrowDown className="text-red-600" />
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
