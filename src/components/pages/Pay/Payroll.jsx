import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavBar } from "../../header/NavBar.jsx";
import { FiMoreHorizontal } from "react-icons/fi";
import { motion } from "framer-motion";
import Select from "react-select";
import { supabase } from "../../login/SupabaseConfig.jsx";
import moment from "moment";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import "./Payroll.scss";

export function Payroll() {
  const [selectedRole, setSelectedRole] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(false);
  const [selectedYear, setSelectedYear] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [role, setRole] = useState([""]);
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getStudents = async () => {
      try {
        const { data, error } = await supabase
          .from("pay")
          .select("*")
          .textSearch(search);

        if (data) {
          setStaffs(data);
          setRole([...new Set(data.map((staff) => staff.role))]);
          setMonth([
            ...new Set(data.map((staff) => moment(staff.date).format("MMM"))),
          ]);
          setYear([
            ...new Set(data.map((staff) => moment(staff.date).format("YYYY"))),
          ]);
        } else {
          console.log(error.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStudents();
  }, [search]);

  const collectionRole = role.map((category) => ({
    value: category,
    label: category,
  }));

  const collectionMonth = month.map((category) => ({
    value: category,
    label: category,
  }));

  const collectionYear = year.map((category) => ({
    value: category,
    label: category,
  }));

  const filterStaffs =
    selectedYear && selectedMonth && selectedRole
      ? staffs.filter(
          (staff) =>
            moment(staff.date).format("YYYY") === selectedYear.value &&
            staff.role === selectedRole.value &&
            moment(staff.date).format("MMM") === selectedMonth.value
        )
      : staffs;

  return (
    <>
      <NavBar />
      <div className="container_link_pay">
        <h1 id="container_h1">Payroll</h1>
        <div>
          <NavLink className="link_pay" to={"/accueil"}>
            Dashboard
          </NavLink>
          <span>|</span>
          <NavLink className="link_pay" to={"/staffs"}>
            Staffs
          </NavLink>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scaleY: 0, transformOrigin: "center" }}
        animate={{ opacity: 1, scaleY: 1, transformOrigin: "bottom" }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.5, easeinout: [0.22, 1, 0.36, 1] }}>
        <div className="container_all_pay">
          <div className="container_search_pay">
            <h2>Selectionner les critères</h2>
            <div className="select">
              <div className="mx-5 rounded w-96">
                <Select
                  autoFocus={true}
                  isClearable
                  options={collectionRole}
                  placeholder="Role"
                  onChange={(selectOption) => setSelectedRole(selectOption)}
                  value={selectedRole}
                />
              </div>
              <div className="mx-5 rounded-2xl w-96">
                <Select
                  autoFocus={true}
                  isClearable
                  options={collectionMonth}
                  placeholder="Selectionner le mois"
                  onChange={(selectOption) => setSelectedMonth(selectOption)}
                  value={selectedMonth}
                />
              </div>
              <div className="mx-5 rounded-2xl w-96">
                <Select
                  autoFocus={true}
                  isClearable
                  options={collectionYear}
                  placeholder="Selectionner l'année"
                  onChange={(selectOption) => setSelectedYear(selectOption)}
                  value={selectedYear}
                />
              </div>
            </div>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              className="w-96 h-12 shadow p-4 text-xl rounded-lg mt-5 ml-5"
              placeholder="Rechercher avec le nom..."
            />
            <NavLink id="button" to={"/addpay"}>
              + Add a New
            </NavLink>
          </div>

          <div className="container_table_pay">
            <table className="table_pay">
              <thead id="thead" key="thead">
                <tr>
                  <th>ID</th>
                  <th>Nom Complet</th>
                  <th>Role</th>
                  <th>Téléphone</th>
                  <th>Date de création</th>
                  <th className="expand_bar">Valeur Avancée</th>
                  <th>Balance</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              {filterStaffs
                .filter(
                  (resultL) =>
                    resultL.name.toLowerCase().includes(search.toLowerCase()) ||
                    resultL.lastName
                      .toLowerCase()
                      .includes(search.toLowerCase())
                )
                .map((staff) => (
                  <tbody key={staff.id} className="scroll">
                    <tr>
                      <td>0{staff.id}</td>
                      <td>
                        {staff.name} {staff.lastName}
                      </td>
                      <td>{staff.role}</td>
                      <td>{staff.phone}</td>
                      <td>{moment(staff.created_at).format("DD/MM/YYYY")}</td>
                      <td>$ {staff.amount}</td>
                      <td>$ {staff.balance}</td>
                      <td> {staff.date}</td>
                      <td
                        id="non"
                        style={{
                          color:
                            staff.statut === "Non Payé"
                              ? "red"
                              : staff.statut === "Avance"
                              ? "#ffa901"
                              : "green",
                          fontSize: "19px",
                          fontWeight: "700",
                        }}>
                        {staff.statut}
                      </td>
                      <td>
                        <span className="actions_pay">
                          <NavLink to={"/update-pay/" + staff.id}>
                            {console.log("hello")}
                            <FiMoreHorizontal />
                          </NavLink>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </motion.div>
    </>
  );
}
