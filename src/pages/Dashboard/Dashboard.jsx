import { Card, Statistic } from "antd";
import { FolderKanban, GraduationCap, Users } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
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
      <div className="h-screen px-52 py-5 bg-color1">
        <div className="text-color2">
          <h1 className="font-semibold text-2xl">Dashboard</h1>
        </div>
        <div className="flex">
          <NavLink to={"/eleves"}>
            <Card className="w-60 mt-10 mr-5">
              <div className="flex justify-between items-center">
                <h2 className="text-lg">Total Eleves</h2>
                <GraduationCap
                  size={40}
                  strokeWidth={2.25}
                  className="text-color1 bg-color1 bg-opacity-45 p-2 rounded-full"
                />
              </div>
              <Statistic value={students} className="font-semibold" />
            </Card>
          </NavLink>
          <NavLink to={"/staffs"}>
            <Card className="w-60 mt-10 mr-5">
              <div className="flex justify-between items-center">
                <h2 className="text-lg">Total Staffs</h2>

                <Users
                  size={40}
                  strokeWidth={2.25}
                  className="text-color3 bg-color3 bg-opacity-45 p-2 rounded-full"
                />
              </div>
              <Statistic value={staffs} className="font-semibold" />
            </Card>
          </NavLink>
          <NavLink to={"/staffs"}>
            <Card className="w-60 mt-10 mr-5">
              <div className="flex justify-between items-center">
                <h2 className="text-lg">Total Professeurs</h2>
                <Users
                  size={40}
                  strokeWidth={2.25}
                  className="text-purple-500 bg-purple-300 bg-opacity-45 p-2 rounded-full"
                />
              </div>
              <Statistic
                value={maxSizePerGroup.Professeur}
                className="font-semibold"
              />
            </Card>
          </NavLink>
          <NavLink to={"/inscription"}>
            <Card className="w-60 mt-10 mr-5">
              <div className="flex justify-between items-center">
                <h2 className="text-lg">Total Inscription</h2>
                <FolderKanban
                  size={40}
                  strokeWidth={2.25}
                  className="text-green-500 bg-green-300 bg-opacity-45 p-2 rounded-full"
                />
              </div>
              {Object.keys(totalRegistrationsPerDay).map((day) => (
                <Statistic
                  key={day}
                  value={totalRegistrationsPerDay[day]}
                  className="font-semibold"
                />
              ))}
            </Card>
          </NavLink>
        </div>
        <div>
          <Card style={{ width: 1020, height: 380, marginTop: 20 }}>
            <h4 className="text-color1 font-semibold mb-5">Balance</h4>
            <Charts />
          </Card>
        </div>
      </div>
    </>
  );
}
