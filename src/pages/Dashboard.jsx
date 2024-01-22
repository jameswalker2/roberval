import { useState, useEffect } from "react";
import { NavBar } from "../components/Navbar/NavBar.jsx";
import { NavLink } from "react-router-dom";
import { supabase } from "../Config/SupabaseConfig.jsx";
import Chart from "react-apexcharts";
import { FaUserGraduate } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineAppRegistration } from "react-icons/md";
import "./Dashboard.scss";
import moment from "moment";

export function Dashboard() {
  const [students, setStudents] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [chartIncome, setChartIncome] = useState([])
  const [chartExpense, setChartExpense] = useState([])


  const options = {
    stroke: {
      curve: 'smooth'
    },
      chart: {
        id: "basic-bar",
      },
        label: {
          show: true,
        },
    series: [{
        name: "Revenu",
        data: chartIncome.map(nums => nums.amount),
        color: "#00ff00",
      },
      {
        name: "Dépense",
        data: chartExpense.map(nums => nums.amount),
        color: "#ff2424",
        fontWeight: 800,
      },
    ],
      xaxis: {
      categories: chartIncome.map(dates => moment(dates.date).format("MMM/YYYY"))
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const studentsData = await supabase
            .from("students")
            .select("*");
        if (studentsData.data) {
          setStudents(studentsData.data);
        }

        const staffsData = await supabase
            .from("staffs")
            .select("*");
        if (staffsData.data) {
          setStaffs(staffsData.data);
        }



        const incomeData = await supabase
            .from("income")
            .select("date, amount")
        if (incomeData.data) {
          setChartIncome(incomeData.data.map(entry => entry));
        }
        console.log(chartIncome.map(dates => dates.date))

        const expenseData = await supabase
            .from("expense")
            .select("amount, date")
        if (expenseData.data) {
          setChartExpense(expenseData.data.map(entry => entry));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données depuis Supabase:", error.message);
      }
    }

    fetchData();

  }, []);


  return (
    <>
      <NavBar />
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
                  <h2 className="text-[30px]">{staffs.length}</h2>
                </div>
              </NavLink>
              <NavLink
                className="card card-compact w-96  shadow-xl"
                to={"/inscription"}
                id="ct">
                <div className="title">
                  <MdOutlineAppRegistration className="w-[20px] h-[20px]" />
                  <h3 className="mt-5 text-[15px] uppercase">Inscriptions</h3>
                  <h2 className="text-[30px]">10</h2>
                </div>
              </NavLink>
            </section>
          </section>
          <section className="revenu">
            <h4 className="text-color1 font-semibold">Balance</h4>
            <Chart
                type="area"
                options={options}
                series={options.series}
                width={"1190"}
                height={"330"}
            />
          </section>
        </div>
    </>
  );
}