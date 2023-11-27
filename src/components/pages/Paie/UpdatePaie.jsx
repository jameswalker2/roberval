import { useState } from "react";
import { NavBar } from "../../header/NavBar";
import { NavLink, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaUserGraduate } from "react-icons/fa6";
import { supabase } from "../../login/SupabaseConfig";
import { useEffect } from "react";
import "./UpdatePaie.scss";

export function UpdatePaie() {
  const { id } = useParams();

  const [amount, setAmount] = useState([]);
  const [balance, setUpdateBalance] = useState("");
  const [versement, setUpdateVersement] = useState("");
  const [statut, setUpdateStatut] = useState("");
  const [date, setDate] = useState("");
  const [student, setStudent] = useState([]);

  useEffect(() => {
    const fetchStudent = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("id")
        .eq(id)
        .single("id", id);

      if (data) {
        setStudent(data);
      } else {
        console.log(error);
      }
    };

    fetchStudent();
  }, [id]);
  console.log(student);

  const handleUpdateFees = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("paie")
        .update({ amount, balance, versement, statut, date })
        .eq("id", id)
        .select("id");

      if (data) {
        console.log(data);
      } else {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container_edit">
        <div className="edit_header">
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
            <NavLink className="link_Addpaie" to={"/eleves"}>
              Mettre à jour
            </NavLink>
          </div>
        </div>
        <div className="edit_studInfo">
          <div id="stud_info">
            <h2>info de l'édutiant</h2>
            <div id="icon_fees">
              <FaUserGraduate id="icon" />
            </div>
            <div id="info">
              <span id="list_info">
                <h3>Nom Complet</h3>
                <p>{student.map((studen) => studen.lastName)}</p>
              </span>
              <span id="list_info">
                <h3>Nom du Père</h3>
                <p>Robert Méat</p>
              </span>
              <span id="list_info">
                <h3>Nom de la mère</h3>
                <p>Monique Méat</p>
              </span>
              <span id="list_info">
                <h3>Personne Responsable</h3>
                <p>Robert Méat</p>
              </span>
            </div>
            <div id="info">
              <span id="list_info">
                <h3>Téléphone</h3>
                <p>42168506</p>
              </span>
              <span id="list_info">
                <h3>Classe</h3>
                <p>NS III</p>
              </span>
              <span id="list_info">
                <h3>ID</h3>
                <p>001</p>
              </span>
            </div>
          </div>
        </div>
        <div id="fees_info">
          <h2>Paiement info</h2>
          <form onSubmit={handleUpdateFees}>
            <input
              type="text"
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Montant Avancé"
              id="ma"
            />
            <input
              type="text"
              onChange={(e) => setUpdateBalance(e.target.value)}
              placeholder="Balance"
              id="bl"
            />
            <select
              onChange={(e) => setUpdateVersement(e.target.value)}
              id="vr_update">
              <option value="">Versement</option>
              <option value="Versement 1">Versement 1</option>
              <option value="Versement 2">Versement 2</option>
              <option value="Versement 3">Versement 3</option>
              <option value="Versement arierer">Versement arierer</option>
            </select>
            <select
              onChange={(e) => setUpdateStatut(e.target.value)}
              id="st_update">
              <option value="">Statut</option>
              <option value="Non Payé">Non Payé</option>
              <option value="Avance">Avance</option>
              <option value="Payé">Payé</option>
            </select>
            <input type="date" onChange={(e) => setDate(e.target.value)} />
            <button id="bt" type="submit">
              Ajouter paiement
            </button>
          </form>
          {/*  */}
          <h2>Résultat</h2>
          <table className="table_fees">
            <thead key="thead">
              <tr>
                <th className="expand_bar">Versement</th>
                <th className="expand_bar">Date de création</th>
                <th className="expand_bar_2">Montant Avancée</th>
                <th className="expand_bar_2">Balance</th>
                <th className="expand_bar_2">Mode de paiement</th>
                <th className="expand_bar_2">Statut</th>
              </tr>
            </thead>
            <tbody key="f" className="scroll">
              <tr>
                <td>Versement 1</td>
                <td>24/11/2023</td>
                <td>$ 2000</td>
                <td>$ 2000</td>
                <td>Cash</td>
                <td>Avance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
