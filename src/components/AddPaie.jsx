import { NavBar } from "../../header/NavBar";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import { supabase } from "../../login/SupabaseConfig";
import "./AddPaie.scss";

export function AddPaie() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [versement, setversement] = useState("");
  const [statut, setStatut] = useState("");
  const [date, setDate] = useState(null);
  const [mode, setMode] = useState(null);

  const handleSearch = async () => {
    try {
      const { data, error } = await supabase
        .from("students")
        .select()
        .ilike("firstName", searchQuery);

      if (error) {
        throw error;
      }

      setSearchResults(data);
    } catch (error) {
      console.error("An error occurred during the search:", error);
    }
  };

  const handleTransferData = async (e) => {
    e.preventDefault();
    try {
      for (const row of searchResults) {
        const {
          lastName,
          firstName,
          lastFather,
          lastMother,
          linkPerson,
          phone,
          classe: studentClass,
        } = row;

        const { error } = await supabase.from("paie").insert([
          {
            lastName,
            firstName,
            classe: studentClass,
            lastMother,
            lastFather,
            linkPerson,
            phone,
            amount,
            balance: 5000,
            versement,
            statut,
            date,
            mode,
          },
        ]);
        if (error) {
          throw error;
        }
      }
      for (const row of searchResults) {
        const { lastName, name, classe: studentClass } = row;
        const { error } = await supabase.from("history").insert([
          {
            lastName,
            name,
            classe: studentClass,
            // phone,
            amount,
            balance,
            versement,
            statut,
            date,
            mode,
          },
        ]);
        if (error) {
          throw error;
        }
      }
      console.log("Data transfer completed successfully!");
      setSearchResults([]);
    } catch (error) {
      console.log(error.message);
    }
    setSearchQuery("");
  };

  balance === 5000;

  return (
    <>
      <NavBar />
      <motion.div
        initial={{ opacity: 0, scaleY: 0, transformOrigin: "center" }}
        animate={{ opacity: 1, scaleY: 1, transformOrigin: "bottom" }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.5, easeinout: [0.22, 1, 0.36, 1] }}>
        {/*  */}
        <div className="container_addPaie">
          <div className="addPaie_header">
            <NavLink to={"/paiement"}>
              <BiArrowBack id="back" />
            </NavLink>
            <div>
              <NavLink className="link_Addpaie" to={"/accueil"}>
                Dashboard
              </NavLink>
              <span>|</span>
              <NavLink className="link_Addpaie" to={"/eleves"}>
                Eleves
              </NavLink>
              <span>|</span>
              <NavLink className="link_Addpaie" to={""}>
                Ajouter un paiement
              </NavLink>
            </div>
          </div>
          <div className="addPaie_body">
            <div className="body_add">
              <h2>Ajouter un nouveau paiement</h2>
              {/*  */}
              <div id="add_list">
                <input
                  type="text"
                  id="sr"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher l'étudiant..."
                />
                <button id="bt_sr" onClick={handleSearch}>
                  Rechercher
                </button>
              </div>
              {searchResults.length > 0 && (
                <div>
                  <table className="table_list">
                    <thead key="thead">
                      <tr>
                        <th>ID</th>
                        <th>Classe</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Mère</th>
                        <th>Père</th>
                        <th>Phone</th>
                      </tr>
                    </thead>
                    {searchResults.map((student) => (
                      <tbody key={student}>
                        <tr>
                          <td>{student.id}</td>
                          <td>{student.classe}</td>
                          <td>{student.firstName}</td>
                          <td>{student.lastName}</td>
                          <td>{student.firstMother}</td>
                          <td>{student.firstMother}</td>
                          <td>{student.phone}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                  {/*  */}
                  <form onSubmit={handleTransferData}>
                    <input
                      type="text"
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Montant Avancé"
                      id="ma"
                    />
                    <input
                      type="text"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                      placeholder="Balance"
                      id="bl"
                    />
                    <select
                      onChange={(e) => setversement(e.target.value)}
                      name="verse"
                      id="vr">
                      <option value="0">Versement</option>
                      <option value="Versement 1">Versement 1</option>
                      <option value="Versement 2">Versement 2</option>
                      <option value="Versement 3">Versement 3</option>
                      <option value="Versement arierer">
                        Versement arierer
                      </option>
                    </select>
                    <select
                      onChange={(e) => setStatut(e.target.value)}
                      name="stat"
                      id="st">
                      <option value="0">Statut</option>
                      <option value="Non Payé">Non Payé</option>
                      <option value="Avance">Avance</option>
                      <option value="Payé">Payé</option>
                    </select>
                    <button id="bt" type="submit">
                      Ajouter paiement
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
