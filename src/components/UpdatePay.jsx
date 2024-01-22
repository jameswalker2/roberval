import { useState } from "react";
import { NavBar } from "../../header/NavBar";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaUserGraduate } from "react-icons/fa6";
import { supabase } from "../../login/SupabaseConfig";
import { useEffect } from "react";
import moment from "moment";
import "./UpdatePay.scss";

export function UpdatePay() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState([]);
  const [balance, setUpdateBalance] = useState("");
  const [versement, setUpdateVersement] = useState("");
  const [statut, setUpdateStatut] = useState("");
  const [date, setDate] = useState("");
  const [mode, setUpdateMode] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [classe, setClasse] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [lastName, setLastName] = useState("");
  // const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      const { data, error } = await supabase
        .from("pay")
        .select()
        .eq("id", id)
        .single();

      if (data) {
        setName(data.firstName);
        setPhone(data.phone);
        setClasse(data.classe);
        setAmount(data.amount);
        setUpdateBalance(data.balance);
        setUpdateVersement(data.versement);
        setUpdateStatut(data.statut);
        setDate(data.date);
        setCreated_at(data.created_at);
        setUpdateMode(data.mode);
        setLastName(data.lastName);
      } else {
        navigate("/payroll", { replace: true });
        console.log(error);
      }
    };

    fetchStaff();
  }, [id, navigate]);

  const handleUpdatePay = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("pay")
        .update({ amount, balance, versement, statut, mode, date })
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

  console.log(amount - 5000);

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
            <h2>info de l&apos;édutiant</h2>
            <div id="icon_fees">
              <FaUserGraduate id="icon" />
            </div>
            <div id="info">
              <span id="list_info">
                <h3>Nom Complet</h3>
                <p>{name}</p>
              </span>
              <span id="list_info">
                <h3>Nom du Père</h3>
              </span>
              <span id="list_info">
                <h3>Nom de la mère</h3>
              </span>
              <span id="list_info">
                <h3>Personne Responsable</h3>
              </span>
            </div>
            <div id="info">
              <span id="list_info">
                <h3>Téléphone</h3>
                <p>{phone}</p>
              </span>
              <span id="list_info">
                <h3>Classe</h3>
                <p>{classe}</p>
              </span>
              <span id="list_info">
                <h3>ID</h3>
                <p>0{id}</p>
              </span>
            </div>
          </div>
        </div>
        <div id="fees_info">
          <h2>Paiement info</h2>
          <form onSubmit={handleUpdatePay}>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Montant Avancé"
              id="ma"
            />
            <input
              type="text"
              value={balance}
              onChange={(e) => setUpdateBalance(e.target.value)}
              placeholder="Balance"
              id="bl"
            />
            <select
              value={versement}
              onChange={(e) => setUpdateVersement(e.target.value)}
              id="vr_update">
              <option value="">Versement</option>
              <option value="Versement 1">Versement 1</option>
              <option value="Versement 2">Versement 2</option>
              <option value="Versement 3">Versement 3</option>
              <option value="Versement arierer">Versement arierer</option>
            </select>
            <select
              value={statut}
              onChange={(e) => setUpdateStatut(e.target.value)}
              id="st_update">
              <option value="">Statut</option>
              <option value="Non Payé">Non Payé</option>
              <option value="Avance">Avance</option>
              <option value="Payé">Payé</option>
            </select>
            <select
              value={mode}
              onChange={(e) => setUpdateMode(e.target.value)}
              id="st_update">
              <option value="">Mode de paiement</option>
              <option value="Cash">Cash</option>
              <option value="Banque">Banque</option>
              <option value="Chèque">Chèque</option>
            </select>
            <input
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
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
                <th className="expand_bar_2">Date</th>
                <th className="expand_bar_2">Mode de paiement</th>
                <th className="expand_bar_2">Statut</th>
              </tr>
            </thead>
            <tbody key="f" className="scroll">
              <tr>
                <td>{versement}</td>
                <td>{moment(created_at).format("DD/MM/YYYY")}</td>
                <td>{amount}</td>
                <td>{balance}</td>
                <td>{date}</td>
                <td>{mode}</td>
                <td>{statut}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
