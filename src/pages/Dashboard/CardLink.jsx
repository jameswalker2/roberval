import { Card, Statistic } from "antd";
import { FolderKanban, GraduationCap, Users } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../../Config/SupabaseConfig";

function CardLink() {
  const [students, setStudents] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [data, setData] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [totalRegistrationsPerDay, setTotalRegistrationsPerDay] = useState({});

  useEffect(() => {
    const registreMax = registrations.reduce((acc, item) => {
      const date = moment(item.date).format("YYYY-MM-DD");

      acc[date] = (acc[date] || 0) + 1;

      return acc;
    }, {});

    setTotalRegistrationsPerDay(registreMax);
  }, [registrations]);

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
    <div>
      <div className="flex sm:flex-wrap ">
        <NavLink to={"/eleves"}>
          <Card
            className="w-64 bg-color2 mt-10 mr-16 shadow-sm transition ease-in-out delay-15 
            hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-lg">Total Eleves</h2>
              <GraduationCap
                size={40}
                strokeWidth={1.5}
                className="text-primaryColor bg-primaryColor bg-opacity-10 p-2 rounded-full"
              />
            </div>
            <Statistic value={students} className="font-semibold" />
          </Card>
        </NavLink>
        <NavLink to={"/staffs"}>
          <Card
            className="w-64 mt-10 mr-16 shadow-sm transition ease-in-out delay-15 
            hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-lg">Total Staffs</h2>

              <Users
                size={40}
                strokeWidth={1.5}
                className="text-supportingColor2 bg-supportingColor2 bg-opacity-10 p-2 rounded-full"
              />
            </div>
            <Statistic value={staffs} className="font-semibold" />
          </Card>
        </NavLink>
        <NavLink to={"/staffs"}>
          <Card
            className="w-64 mt-10 mr-16 shadow-sm transition ease-in-out delay-15 
            hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-lg">Total Professeurs</h2>
              <Users
                size={40}
                strokeWidth={1.5}
                className="text-supportingColor3 bg-supportingColor3 bg-opacity-10 p-2 rounded-full"
              />
            </div>
            <Statistic
              value={maxSizePerGroup.Professeur}
              className="font-semibold"
            />
          </Card>
        </NavLink>
        <NavLink to={"/inscription"}>
          <Card
            className="w-64 mt-10 shadow-sm transition ease-in-out delay-15 
            hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-lg">Total Inscription</h2>
              <FolderKanban
                size={40}
                strokeWidth={1.5}
                className="text-supportingColor4 bg-supportingColor4 bg-opacity-10 p-2 rounded-full"
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
    </div>
  );
}

export default CardLink;
