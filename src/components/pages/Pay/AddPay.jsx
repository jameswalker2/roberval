import { NavBar } from "../../header/NavBar";
import { motion } from "framer-motion";
import { NavLink, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import { supabase } from "../../login/SupabaseConfig";
import "./AddPay.scss";

export function AddPay() {
  const { id } = useParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [statut, setStatut] = useState("");
  const [date, setDate] = useState(null);
  const [mode, setMode] = useState(null);

  const handleSearch = async () => {
    try {
      const { data, error } = await supabase
        .from("staffs")
        .select()
        .ilike("name", searchQuery);

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
        const { lastName, role, name, phone } = row;

        const { error } = await supabase.from("pay").insert([
          {
            name,
            lastName,
            phone,
            amount,
            balance: 5000,
            statut,
            role,
            date,
            mode,
          },
        ]);
        if (error) {
          throw error;
        }
      }
      // for (const row of searchResults) {
      //   const { lastName, name, classe: studentClass } = row;
      //   const { error } = await supabase.from("history").insert([
      //     {
      //       lastName,
      //       name,
      //       classe: studentClass,
      //       // phone,
      //       amount,
      //       balance,
      //       versement,
      //       statut,
      //       date,
      //       mode,
      //     },
      //   ]);
      //   if (error) {
      //     throw error;
      //   }
      // }
      console.log("Data transfer completed successfully!");
      setSearchResults([]);
    } catch (error) {
      console.log(error.message);
    }
    setSearchQuery("");
  };

  return (
    <>
      <NavBar />
      <motion.div
        initial={{ opacity: 0, scaleY: 0, transformOrigin: "center" }}
        animate={{ opacity: 1, scaleY: 1, transformOrigin: "bottom" }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.5, easeinout: [0.22, 1, 0.36, 1] }}>
        {/*  */}
        <div className="container_addPay">
          <div className="addPay_header">
            <NavLink to={"/payroll"}>
              <BiArrowBack id="back" />
            </NavLink>
            <div>
              <NavLink className="link_Addpay" to={"/accueil"}>
                Dashboard
              </NavLink>
              <span>|</span>
              <NavLink className="link_Addpay" to={"/staffs"}>
                Staffs
              </NavLink>
              <span>|</span>
              <NavLink className="link_Addpay" to={""}>
                Ajouter un payroll
              </NavLink>
            </div>
          </div>
          <div className="addPay_body">
            <div className="body_add">
              <h2>Ajouter un nouveau paiement</h2>
              {/*  */}
              <div id="add_list">
                <input
                  type="text"
                  id="sr"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher avec le nom..."
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
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Adresse</th>
                        <th>Téléphone</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    {searchResults.map((staff) => (
                      <tbody key={staff.staffs_id}>
                        <tr>
                          <td>0{staff.id}</td>
                          <td>{staff.name}</td>
                          <td>{staff.lastName}</td>
                          <td>{staff.adress}</td>
                          <td>{staff.phone}</td>
                          <td>{staff.email}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                  {/*  */}
                  <form onSubmit={handleTransferData}>
                    <input
                      type="text"
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Montant Avancée"
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
