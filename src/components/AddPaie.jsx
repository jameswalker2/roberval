import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { supabase } from "../Config/SupabaseConfig.jsx";
import "./AddPaie.scss";
import { NavBar } from "./Navbar/NavBar.jsx";

export function AddPaie() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [versement, setversement] = useState("");
  const [statut, setStatut] = useState("");
  const [date, setDate] = useState(null);
  const [mode, setMode] = useState(null);

  let getAmount = 0;

  const handleSearch = async () => {
    try {
      const { data, error } = await supabase
        .from("students")
        .select()
        .ilike("lastName", searchQuery);

      if (error) {
        throw error;
      } else {
        setSearchResults(data);
      }
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
            balance: testAmount,
            versement,
            statut,
            date,
            mode,
          },
        ]);
        if (error) {
          throw error;
        } else {
          console.log("Data transfer completed successfully!");
        }
      }
      setSearchResults([]);
    } catch (error) {
      console.log(error.message);
    }
    setSearchQuery("");
  };

  for (const row of searchResults) {
    const { classe: studentClass } = row;

    switch (studentClass) {
      case "1e Annee Kind":
      case "2e Annee Kind":
      case "3e Annee Kind":
        getAmount = 6500;
        break;
      case "1e Annee Fond":
      case "2e Annee Fond":
      case "3e Annee Fond":
        getAmount = 4500;
        break;
      case "4e Annee Fond":
      case "5e Annee Fond":
      case "6e Annee Fond":
        getAmount = 5000;
        break;
      case "7e Annee Fond":
      case "8e Annee Fond":
        getAmount = 6500;
        break;
      case "9e Annee Fond":
        getAmount = 7000;
        break;
      case "NS I":
        getAmount = 8000;
        break;
      case "NS II":
      case "NS III":
        getAmount = 8500;
        break;
      case "NS IV":
        getAmount = 10000;
        break;

      default:
        getAmount = 0;
        break;
    }
  }

  let testAmount = getAmount - amount;

  return (
    <>
      <NavBar />
      <div className="container_addPaie">
        <div className="addPaie_header">
          <NavLink to={"/paiement"}>
            <BiArrowBack className="h-8 w-8 text-color1" />
          </NavLink>
          <div>
            <NavLink className="link_Addpaie" to={"/dashboard"}>
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
                placeholder="Rechercher avec le prénom de l'étudiant..."
              />
              <button id="bt_sr" onClick={handleSearch}>
                Rechercher
              </button>
            </div>

            {searchResults.length > 0 && (
              <div>
                <table className="table">
                  <thead className="text-color1 ">
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
                        <td>{student.lastMother}</td>
                        <td>{student.lastFather}</td>
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
                    placeholder="Montant Annuel"
                    id="ma"
                  />
                  <input
                    type="text"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    placeholder={testAmount}
                    id="bl"
                  />
                  <select
                    onChange={(e) => setversement(e.target.value)}
                    name="verse"
                    id="vr">
                    <option value="0" className="text-gray-300">
                      Versement
                    </option>
                    <option value="1er Versement">1er Versement</option>
                    <option value="2e Versement">2e Versement</option>
                    <option value="3e Versement">3e Versement</option>
                    <option value="Versement arierer">Versement arierer</option>
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
    </>
  );
}
