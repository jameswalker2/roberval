import { useState, useEffect } from "react";
import { NavBar } from "../../header/NavBar.jsx";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../../login/SupabaseConfig.jsx";
import Chart from "react-apexcharts";
import { FaUserGraduate } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineAppRegistration } from "react-icons/md";
import "./Dashboard.scss";

export function Dashboard() {
  const [students, setStudents] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Janvier",
          "Février",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Aout",
          "Septembre",
          "Octobre",
          "Novembre",
          "Décembre",
        ],
        label: {
          show: true,
        },
      },
    },
    series: [
      {
        name: "Revenu",
        data: [
          20500, 2500, 500, 10000, 200, 5160, 8000, 250, 3000, 48059, 500,
          10000,
        ],
        color: "#00ff00",
      },
      {
        name: "Depense",
        data: [
          2800, 200, 3000, 150, 56156, 4899, 1778, 5168, 5822, 100, 20, 598,
        ],
        color: "#ff2424",
        fontWeight: 800,
      },
    ],
  });

  useEffect(() => {
    async function numStudents() {
      const { data } = await supabase.from("students").select("*");

      if (data) {
        setStudents(data);
      }
    }

    async function numStaffs() {
      const { data } = await supabase.from("staffs").select();

      if (data) {
        setStaffs(data);
      }
    }

    numStudents();
    numStaffs();
  }, []);

  return (
    <>
      <NavBar />
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.2, easeinout: [0.22, 1, 0.36, 1] }}>
        {/*  */}
        <div className="container_dash">
          <section className="dashboard">
            <h1>Dashboard</h1>
            <p style={{ fontWeight: "200" }}>Bienvenue sur votre Dashboard</p>
            {/*  */}
            <section className="content-dash">
              <NavLink
                className="card card-compact w-96 shadow-xl"
                to={"/eleves"}
                id="ct">
                <FaUserGraduate className="w-[20px] h-[20px]" />
                <div className="title">
                  <h3 className="mt-5 text-[15px] uppercase">Totale Elèves</h3>
                  <h2 className="text-[30px]">{students.length}</h2>
                </div>
              </NavLink>
              <NavLink
                className="card card-compact w-96 shadow-xl"
                to={"/staffs"}
                id="ct">
                <FaUsers className="w-[20px] h-[20px]" />
                <div className="title">
                  <h3 className="mt-5 text-[15px] uppercase">Total staffs</h3>
                  <h2 className="text-[30px]">{staffs.length}</h2>
                </div>
              </NavLink>
              <NavLink
                className="card card-compact w-96  shadow-xl"
                to={"/staffs"}
                id="ct">
                <FaChalkboardTeacher className="w-[20px] h-[20px]" />
                <div className="title">
                  <h3 className="mt-5 text-[15px] uppercase">
                    Total professeurs
                  </h3>
                  <h2 className="text-[30px]">100</h2>
                </div>
              </NavLink>
              <NavLink
                className="card card-compact w-96  shadow-xl"
                to={"/inscription"}
                id="ct">
                <div className="title">
                  <MdOutlineAppRegistration className="w-[20px] h-[20px]" />
                  <h3 className="mt-5 text-[15px] uppercase">Incription</h3>
                  <h2 className="text-[30px]">10</h2>
                </div>
              </NavLink>
            </section>
          </section>
          <section className="revenu">
            <h4 className="text-color1 font-semibold">Balance</h4>
            <Chart
              options={state.options}
              series={state.series}
              type="area"
              width={"1190"}
              height={"330"}
            />
          </section>
        </div>
      </motion.div>
    </>
  );
}
