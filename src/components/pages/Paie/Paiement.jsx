import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../../login/SupabaseConfig.jsx";
import { motion } from "framer-motion";
import { NavBar } from "../../header/NavBar.jsx";
import Select from "react-select";
import { FiMoreHorizontal } from "react-icons/fi";
import "./Paiement.scss";
import moment from "moment/moment.js";

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

  const colorStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      color: "#ffffffff",
      backgroundColor: state.isFocused && "white",
      boxShadow: "0 0 5px 0 rgba(0,0,0,0.2)",
      border: "none",
      outline: "0",
      font: "inherit",
      width: "25rem",
      maxWidth: "25rem",
      height: "2.8rem",
      padding: "0 20px",
      margin: "0 25px",
      fontSize: "19px",
      borderRadius: "10px",
    }),
    option: (styles, { data }) => {
      return { ...styles, width: data.width ? "20rem" : "28rem", color: "red" };
    },
  };

  const filterStudents = selectedCategory
    ? studentsP.filter((student) => student.classe === selectedCategory.value)
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
              <Select
                isClearable
                styles={colorStyles}
                options={collectionOptions}
                placeholder="Classe"
                onChange={(selectOption) => setSelectedCategory(selectOption)}
                value={selectedCategory}
              />
              <input
                placeholder="Entrez le nom de l'étudiant..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                id="search"
              />
              <NavLink className="button" to={"/addPaie"}>
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
                      <td>{student.id}</td>
                      <td>{student.classe}</td>
                      <td className="expand_bar">
                        {student.firstName} {student.lastName}
                      </td>
                      <td>{moment(student.created_at).format("DD/MM/YYYY")}</td>
                      <td>{student.amount}</td>
                      <td>{student.balance}</td>
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
                          <NavLink to={"/" + student.id}>
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
