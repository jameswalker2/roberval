import { useState, useEffect } from "react";
import { NavBar } from "../../header/NavBar.jsx";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../../login/SupabaseConfig.jsx";
import Chart from "react-apexcharts";
import "./Dashboard.scss";

export function Dashboard() {
  const [text, setText] = useState([]);
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
        data: [1500, 2500, 500, 10000],
        color: "#00ff00",
      },
      {
        name: "Depense",
        data: [20000, 200, 3000, 150],
        color: "#ff2424",
      },
    ],
  });

  useEffect(() => {
    async function numStudents() {
      const { data, error } = await supabase.from("students").select("*");

      if (data) {
        setText(data);
      }
      if (error) throw error;
    }

    numStudents();
  }, []);

  return (
    <>
      <NavBar />
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.5, easeinout: [0.22, 1, 0.36, 1] }}>
        {/*  */}
        <div className="container_dash">
          <section className="dashboard">
            <h1>Dashboard</h1>
            <p style={{ fontWeight: "200" }}>Bienvenue sur votre Dashboard</p>
            {/*  */}
            <section className="content-dash">
              <NavLink to={"/eleves"} id="ct">
                <div className="title">
                  <h3>Elève</h3>
                  <h2>{text.length}</h2>
                </div>
                <p>Total élèves</p>
              </NavLink>
              <NavLink to={"/staffs"} id="ct">
                <div className="title">
                  <h3>Staff</h3>
                  <h2>500</h2>
                </div>
                <p>Total staffs</p>
              </NavLink>
              <NavLink to={"/profs"} id="ct">
                <div className="title">
                  <h3>Prof</h3>
                  <h2>100</h2>
                </div>
                <p>Total professeurs</p>
              </NavLink>
              <NavLink to={"/inscription"} id="ct">
                <div className="title">
                  <h3>Incription</h3>
                  <h2>10</h2>
                </div>
                <p>Total professeurs</p>
              </NavLink>
            </section>
          </section>
          <section className="revenu">
            <h4>Revenu et Depense</h4>
            <h2>$20,156.30</h2>
            <Chart
              options={state.options}
              series={state.series}
              type="area"
              width={"750"}
              height={"320"}
            />
          </section>
          <section className="recent">
            <h4>Ajout récent</h4>
            <table className="table_paiement">
              <thead key="thead">
                <tr>
                  <th className="expand_bar">Nom Complet</th>
                  <th className="expand_bar_2">Valeur Avancée</th>
                  <th className="expand_bar_2">Balance</th>
                </tr>
              </thead>
              <tbody className="scroll">
                <tr>
                  <td></td>
                  <td></td>
                  <td className="expand_bar"></td>
                  <td>$2000</td>
                  <td>$5000</td>
                  <td>Versement 1</td>
                  <td
                    id="non"
                    style={{
                      fontWeight: "700",
                      textTransform: "uppercase",
                      color: "red",
                    }}
                  />
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </motion.div>
    </>
  );
}
