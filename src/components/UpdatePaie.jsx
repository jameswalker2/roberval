import { Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa6";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../Config/SupabaseConfig.jsx";
import { NavBar } from "./Navbar/NavBar.jsx";

export function UpdatePaie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [balance, setUpdateBalance] = useState("");
  const [versement, setUpdateVersement] = useState("");
  const [statut, setUpdateStatut] = useState("");
  const [date, setDate] = useState("");
  const [mode, setUpdateMode] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setfatherName] = useState("");
  const [motherName, setmotherName] = useState("");
  const [linkPerson, setLinkPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [classe, setClasse] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [lastName, setLastName] = useState("");
  const [nouveauMontant, setNouveauMontant] = useState(0);
  const [getId, setGetId] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      const { data, error } = await supabase
        .from("generated_paiement")
        .select()
        .eq("id", id)
        .single();

      if (data) {
        setName(data.firstName);
        setfatherName(data.lastFather);
        setmotherName(data.lastMother);
        setLinkPerson(data.linkPerson);
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
        setGetId(data.student_id);
      } else {
        navigate("/paiement", { replace: true });
        console.log(error);
      }
    };

    fetchStudent();
  }, [id, navigate]);

  const handleUpdateFees = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("generated_paiement")
        .update({
          amount: montantTotal,
          balance: testAmount,
          versement,
          statut,
          mode,
          date,
        })
        .eq("id", id)
        .select("id");

      if (error) {
        throw error;
      } else {
        Modal.success("Paiement ajouter avec success !");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const { error } = await supabase
        .from("history_paiement")
        .insert({
          amount: montantTotal,
          balance: testAmount,
          versement,
          statut,
          mode,
          date,
          generated_id: getId,
        })
        .eq("id", id)
        .select("id");

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const { error } = await supabase
        .from("income")
        .insert({
          amount: montantTotal,
          mode,
          date,
          name: lastName,
          what: "Frais Scolaire",
        })
        .eq("id", id)
        .select("id");

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNouveauMontantChange = (e) => {
    setNouveauMontant(parseFloat(e.target.value) || 0);
  };

  let testAmount = balance - nouveauMontant;

  let montantTotal = amount + nouveauMontant;

  return (
    <>
      <NavBar />
      <div className="h-screen overflow-scroll pl-64 py-5 bg-primaryColor bg-opacity-10">
        <div className="text-sm breadcrumbs flex items-center justify-between w-[95%] h-16 p-4 text-supportingColor1 bg-white rounded-lg shadow-sm">
          <h1 className="font-semibold text-2xl">Ajouter Paiement</h1>
          <ul>
            <li>
              <NavLink className="text-supportingColor1" to={"/dashboard"}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className="text-supportingColor1" to={"/eleves"}>
                Eleves
              </NavLink>
            </li>
            <li>
              <NavLink className="text-supportingColor1" to={"/paiement"}>
                Paiement
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <div id="stud_info">
            <h2>info de l&apos;édutiant</h2>
            <div id="icon_fees">
              <FaUserGraduate id="icon" />
            </div>
            <div id="info">
              <span id="list_info">
                <h3 className={"font-semibold"}>Nom Complet</h3>
                <p>{name}</p>
              </span>
              <span id="list_info">
                <h3 className={"font-semibold"}>Nom du Père</h3>
                <p>{fatherName}</p>
              </span>
              <span id="list_info">
                <h3 className={"font-semibold"}>Nom de la mère</h3>
                <p>{motherName}</p>
              </span>
              <span id="list_info">
                <h3 className={"font-semibold"}>Personne Responsable</h3>
                <p>{linkPerson}</p>
              </span>
            </div>
            <div id="info">
              <span id="list_info">
                <h3 className={"font-semibold"}>Téléphone</h3>
                <p>{phone}</p>
              </span>
              <span id="list_info">
                <h3 className={"font-semibold"}>Classe</h3>
                <p>{classe}</p>
              </span>
              <span id="list_info">
                <h3 className={"font-semibold"}>ID</h3>
                <p>0{id}</p>
              </span>
            </div>
          </div>
        </div>

        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <h2>Paiement info</h2>
          <form onSubmit={handleUpdateFees}>
            <input
              type="text"
              placeholder="Montant Avancé"
              value={nouveauMontant}
              onChange={handleNouveauMontantChange}
              className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs mt-10 mr-10 mb-10"
            />
            <input
              type="text"
              value={testAmount}
              placeholder="Balance"
              onChange={(e) => setUpdateBalance(e.target.value)}
              className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs mr-10"
            />
            <select
              value={versement}
              className="select select-bordered focus:select-primary bg-gray-200 w-full max-w-xs mr-10"
              onChange={(e) => setUpdateVersement(e.target.value)}>
              <option value="">Versement</option>
              <option value="Versement 1">Versement 1</option>
              <option value="Versement 2">Versement 2</option>
              <option value="Versement 3">Versement 3</option>
              <option value="Versement arierer">Versement arierer</option>
            </select>
            <select
              value={statut}
              onChange={(e) => setUpdateStatut(e.target.value)}
              className="select select-bordered focus:select-primary bg-gray-200 w-full max-w-xs mr-10">
              <option value="">Statut</option>
              <option value="Non Payé">Non Payé</option>
              <option value="Avance">Avance</option>
              <option value="Payé">Payé</option>
            </select>
            <select
              value={mode}
              onChange={(e) => setUpdateMode(e.target.value)}
              className="select select-bordered focus:select-primary bg-gray-200 w-full max-w-xs mr-10">
              <option value="">Mode de paiement</option>
              <option value="Cash">Cash</option>
              <option value="Banque">Banque</option>
              <option value="Chèque">Chèque</option>
            </select>
            <input
              value={date}
              type="date"
              className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs mr-10"
              onChange={(e) => setDate(e.target.value)}
            />
            <button
              className="btn bg-color2 text-white border-none mt-10 mb-10 hover:bg-color3"
              type="submit">
              Ajouter paiement
            </button>
          </form>
          {/*  */}
          <h2>Résultat</h2>
          <table className="table">
            <thead key="thead" className="text-color1">
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
                <td>{montantTotal}</td>
                <td>{testAmount}</td>
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
