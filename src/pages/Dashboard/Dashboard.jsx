import moment from "moment";
import { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaUserGraduate, FaUsers } from "react-icons/fa";
import { MdOutlineAppRegistration } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { supabase } from "../../Config/SupabaseConfig.jsx";
import { NavBar } from "../../components/Navbar/NavBar.jsx";
import Charts from "./Charts.jsx";
import "./Dashboard.scss";

export function Dashboard() {
  const [students, setStudents] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [data, setData] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [totalRegistrationsPerDay, setTotalRegistrationsPerDay] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const studentsData = await supabase.from("students").select("*");
        if (studentsData.data) {
          setStudents(studentsData.data.length);
          setRegistrations(studentsData.data);
        }

        const staffsData = await supabase.from("staffs").select("*");
        if (staffsData.data) {
          setStaffs(staffsData.data.length);
          setData(staffsData.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(registrations);

    const registreMax = registrations.reduce((acc, item) => {
      const date = moment(item.date).format("YYYY-MM-DD");

      acc[date] = (acc[date] || 0) + 1;

      return acc;
    }, {});

    setTotalRegistrationsPerDay(registreMax);
  }, [registrations]);

  const groupedData = data.reduce((acc, item) => {
    const role = item.role;

    const firstWord = role.split(" ")[0];

    if (!acc[firstWord]) {
      acc[firstWord] = [];
    }
    acc[firstWord].push(item);

    return acc;
  }, {});

  const maxSizePerGroup = Object.keys(groupedData).reduce((acc, group) => {
    acc[group] = groupedData[group].length;
    return acc;
  }, {});

  return (
    <>
      <NavBar />
      <div className="h-screen">
        <div className="absolute left-48">
          <section className="dashboard">
            <h1>Dashboard</h1>
            <p>Bienvenue sur votre Dashboard</p>
            {/*  */}
            <section className="content-dash">
              <NavLink
                className="card card-compact w-96 shadow-xl"
                to={"/eleves"}
                id="ct">
                <FaUserGraduate className="w-[20px] h-[20px]" />
                <div className="title">
                  <h3 className="mt-5 text-[15px] uppercase">Totale Elèves</h3>
                  <h2 className="text-[30px]">{students}</h2>
                </div>
              </NavLink>
              <NavLink
                className="card card-compact w-96 shadow-xl"
                to={"/staffs"}
                id="ct">
                <FaUsers className="w-[20px] h-[20px]" />
                <div className="title">
                  <h3 className="mt-5 text-[15px] uppercase">Total staffs</h3>
                  <h2 className="text-[30px]">{staffs}</h2>
                </div>
              </NavLink>
              <NavLink
                className="card card-compact w-96  shadow-xl"
                to={"/staffs"}
                id="ct">
                <FaChalkboardTeacher className="w-[20px] h-[20px]" />
                <div className="title">
                  <h3 className="mt-5 text-[15px] uppercase">
                    Total Professeurs{/* {staffs} */}
                  </h3>
                  <h2 className="text-[30px]">{maxSizePerGroup.Professeur}</h2>
                </div>
              </NavLink>
              <NavLink
                className="card card-compact w-96  shadow-xl"
                to={"/inscription"}
                id="ct">
                <div className="title">
                  <MdOutlineAppRegistration className="w-[20px] h-[20px]" />
                  <h3 className="mt-5 text-[15px] uppercase">Inscriptions</h3>
                  {Object.keys(totalRegistrationsPerDay).map((day) => (
                    <div key={day}>
                      <h2 className="text-[30px]">
                        {totalRegistrationsPerDay[day]}
                      </h2>
                    </div>
                  ))}
                </div>
              </NavLink>
            </section>
          </section>
          <section className="revenu">
            <h4 className="text-color1 font-semibold">Balance</h4>
            <Charts />
          </section>
        </div>
      </div>
    </>
  );
}
