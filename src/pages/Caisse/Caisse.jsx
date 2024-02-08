import { supabase } from "@/Config/SupabaseConfig.jsx";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta.js";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
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
      <div className="h-screen pl-52">
        {/*  */}
        <CaisseLink />
        {/*  */}
        <div className="card_secondaire">
          <div className="card_chart">
            <h2 className="font-semibold text-color1">
              Balance revenu/dépense
            </h2>
            {/* <p className="text-[15px] ">Total Balance du Dec</p> */}
            <Chart
              options={state.options}
              series={state.series}
              type="area"
              width={"720"}
              height={"310"}
            />
          </div>
          <div className="ml-10 p-5 w-96 rounded-2xl bg-white">
            <h2 className="text-[20px] text-color1 font-semibold">
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
