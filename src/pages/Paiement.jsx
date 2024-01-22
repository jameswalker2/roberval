import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../../login/SupabaseConfig.jsx";
import { motion } from "framer-motion";
import { NavBar } from "../../header/NavBar.jsx";
import { FiMoreHorizontal } from "react-icons/fi";
import moment from "moment/moment.js";
import "./Paiement.scss";

export function Paiement() {
  const [studentsP, setStudentsP] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getStudents = async () => {
      try {
        // eslint-disable-next-line no-unused-vars
        const { data, error } = await supabase
          .from("paie")
          .select("*")
          .textSearch(search);

        if (data) {
          setStudentsP(data);
          setClasses([...new Set(data.map((student) => student.classe))]);
        } else {
          console.log(error.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStudents();
  }, [search]);

  const collectionOptions = classes.map((category) => ({
    value: category,
    label: category,
  }));
  console.log(setSelectedCategory);

  const filterStudents = selectedCategory
    ? studentsP.filter((student) => student.classe === selectedCategory)
    : studentsP;
  return (
    <>
      <NavBar />
      <div className="container_link_paie">
        <h1 id="container_h1">Paiement</h1>
        <div>
          <NavLink className="link_paie" to={"/accueil"}>
            Dashboard
          </NavLink>
          <span>|</span>
          <NavLink className="link_paie" to={"/eleves"}>
            Eleves
          </NavLink>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scaleY: 0, transformOrigin: "center" }}
        animate={{ opacity: 1, scaleY: 1, transformOrigin: "bottom" }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.5, easeinout: [0.22, 1, 0.36, 1] }}>
        <div className="container_all">
          <div className="container_search">
            <h2>Selectionner les critères</h2>
            <p>Chercher par classe ou par nom directement</p>
            <div id="form_search">
              <div className="mx-9 rounded-2xl w-96">
                <select
                  title="tes"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="select bg-slate-50 shadow-md text-gray-400 text-[19px] select-bordered  w-full max-w-xs">
                  <option
                    className="text-color2 font-semibold text-[19px]"
                    disabled
                    selected>
                    Selectionner par Classe
                  </option>
                  {collectionOptions.map((option) => (
                    <option
                      className="text-red-600"
                      key={option.value}
                      value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <input
                placeholder="Rechercher avec le nom de l'étudiant..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                id="search"
              />
              <NavLink className="button" to={"/addpaie"}>
                + Add a new
              </NavLink>
            </div>
            {/*<h3>Total <span>$10,000 </span></h3>*/}
          </div>

          <div className="table_search_paiement">
            <table className="table_paiement">
              <thead key="thead">
                <tr>
                  <th>ID</th>
                  <th>Classe</th>
                  <th className="expand_bar">Nom Complet</th>
                  <th className="expand_bar">Date de création</th>
                  <th className="expand_bar_2">Montant Avancée</th>
                  <th className="expand_bar_2">Balance</th>
                  <th className="expand_bar_2">Date</th>
                  <th className="expand_bar_2">Versement</th>
                  <th className="expand_bar_2">Statut</th>
                  <th className="expand_bar_2">Action</th>
                </tr>
              </thead>
              {filterStudents
                .filter((resultL) =>
                  resultL.firstName.toLowerCase().includes(search.toLowerCase())
                )
                .map((student) => (
                  <tbody key={student.id} className="scroll">
                    <tr>
                      <td>0{student.id}</td>
                      <td>{student.classe}</td>
                      <td className="expand_bar">
                        {student.firstName} {student.lastName}
                      </td>
                      <td>{moment(student.created_at).format("DD/MM/YYYY")}</td>
                      <td>{student.amount}</td>
                      <td>{student.balance}</td>
                      <td>{student.date}</td>
                      <td>{student.versement}</td>
                      <td
                        id="non"
                        style={{
                          color:
                            student.statut === "Non Payé"
                              ? "red"
                              : student.statut === "Avance"
                              ? "#ffa901"
                              : "green",
                          fontSize: "19px",
                          fontWeight: "700",
                        }}>
                        {student.statut}
                      </td>
                      <td>
                        <span className="actions">
                          <NavLink to={"/update-paie/" + student.id}>
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
