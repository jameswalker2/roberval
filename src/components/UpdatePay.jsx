import moment from "moment";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../Config/SupabaseConfig.jsx";
import { NavBar } from "./Navbar/NavBar.jsx";
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
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [nouveauMontant, setNouveauMontant] = useState(0);

  useEffect(() => {
    const fetchStaff = async () => {
      const { data, error } = await supabase
        .from("pay")
        .select()
        .eq("id", id)
        .single();

      if (data) {
        setName(data.name);
        setLastName(data.lastName);
        setRole(data.role);
        setPhone(data.phone);
        setAmount(data.amount);
        setUpdateBalance(data.balance);
        setUpdateVersement(data.versement);
        setUpdateStatut(data.statut);
        setDate(data.date);
        setCreated_at(data.created_at);
        setUpdateMode(data.mode);
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
      const { error } = await supabase
        .from("pay")
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
        toast.success("Payroll mise à jour avec success !");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const { error } = await supabase
        .from("expense")
        .insert({
          amount: montantTotal,
          mode,
          date,
          name: lastName,
          what: "Payroll",
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
      <Toaster position={"top-right"} />
      <div className="container_edit">
        <div className="flex w-[75.9rem] items-center justify-between h-11 mb-10 bg-white px-10 rounded-full">
          <NavLink className="text-2xl text-color1" to={"/payroll"}>
            <BiArrowBack />
          </NavLink>
          <div>
            <NavLink
              className="font-medium text-color2 hover:text-color1"
              to={"/dashboard"}>
              Dashboard
            </NavLink>
            <span className="m-5">|</span>
            <NavLink
              className="font-medium text-color2 hover:text-color1"
              to={"/staffs"}>
              Staffs
            </NavLink>
            <span className="m-5">|</span>
            <NavLink className="font-medium text-color2 hover:text-color1">
              Mettre à Jour
            </NavLink>
          </div>
        </div>
        <div className="edit_studInfo">
          <div id="stud_info">
            <h2>info de l&apos;édutiant</h2>
            <div id="icon_fees">
              <FaRegUser className={"w-32 h-32 text-color1"} />
            </div>
            <div id="info">
              <span id="list_info">
                <h3>Prénom</h3>
                <p>{name}</p>
              </span>
              <span id="list_info">
                <h3>Nom</h3>
                <p>{lastName}</p>
              </span>
              <span id="list_info">
                <h3>Fonction</h3>
                <p>{role}</p>
              </span>
              <span id="list_info">
                <h3>Numéro</h3>
                <p>{phone}</p>
              </span>
            </div>
          </div>
        </div>
        <div id="fees_info">
          <h2>Paiement info</h2>
          <form onSubmit={handleUpdatePay}>
            <input
              type="text"
              placeholder="Montant Avancé"
              value={nouveauMontant}
              onChange={handleNouveauMontantChange}
              className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs mt-10 mr-10 mb-10"
            />
            <input
              type="text"
              placeholder="Balance"
              value={testAmount}
              onChange={(e) => setUpdateBalance(e.target.value)}
              className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs mr-10"
            />
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
                <th>Date de création</th>
                <th>Montant Avancée</th>
                <th>Balance</th>
                <th>Date</th>
                <th>Mode de paiement</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody key="f" className="scroll">
              <tr>
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
