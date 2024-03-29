import { DatePicker, Modal } from "antd";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [date, setDate] = useState(null);
  const [mode, setUpdateMode] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [classe, setClasse] = useState("");
  const [fatherName, setfatherName] = useState("");
  const [motherName, setmotherName] = useState("");
  const [linkPerson, setLinkPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [bourse, setBourse] = useState("");
  const [nouveauMontant, setNouveauMontant] = useState(0);
  const [getId, setGetId] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      const { data, error } = await supabase
        .from("generated_paiement")
        .select(`*, students (*)`)
        .eq("id", id)
        .single();

      if (data) {
        setName(data.students.firstName);
        setLastName(data.students.lastName);
        setClasse(data.students.classe);
        setfatherName(data.students.lastFather);
        setmotherName(data.students.lastMother);
        setLinkPerson(data.students.linkPerson);
        setPhone(data.students.phone);
        setAddress(data.students.address);
        setEmail(data.students.email);
        setAmount(data.amount);
        setUpdateBalance(data.balance);
        setUpdateVersement(data.versement);
        setUpdateStatut(data.statut);
        setUpdateMode(data.mode);
        setGetId(data.student_id);
        setBourse(data.bourse);
        console.log(data);
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
        Modal.success({
          content: "Paiement ajouter avec success !",
          okButtonProps: { type: "default" },
        });
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
          bourse,
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

        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm flex">
          <div>
            <div className="bg-gray-300 w-40 h-40 mb-3 rounded-lg">
              <User size={160} strokeWidth={1} />
            </div>
            <div className="">
              <h2 className="font-medium text-xl">
                {name} {lastName}
              </h2>
              <h3 className="font-medium text-primaryColor">{classe}</h3>
            </div>
          </div>
          <div className="ml-40">
            <span className="flex justify-between mb-5">
              <h2 className="font-semibold mr-40">ID inscription :</h2>
              <p>{id}</p>
            </span>
            <span className="flex justify-between mb-5">
              <h2 className="font-semibold mr-40">Nom du père :</h2>
              <p>{fatherName}</p>
            </span>
            <span className="flex justify-between mb-5">
              <h2 className="font-semibold mr-40">Nom de la mère :</h2>
              <p>{motherName}</p>
            </span>
            <span className="flex justify-between mb-5">
              <h2 className="font-semibold mr-40">
                Nom personne responsable :
              </h2>
              <p>{linkPerson}</p>
            </span>
            <span className="flex justify-between mb-5">
              <h2 className="font-semibold mr-40">Numéro téléphone :</h2>
              <p className="">{phone}</p>
            </span>
            <span className="flex justify-between mb-5">
              <h2 className="font-semibold mr-40">Adresse :</h2>
              <p>{address}</p>
            </span>
            <span className="flex justify-between mb-5">
              <h2 className="font-semibold mr-40">Email :</h2>
              <p>{email}</p>
            </span>
          </div>
        </div>

        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <div>
            <h2>Paiement info</h2>
            <form onSubmit={handleUpdateFees}>
              <div className="flex flex-wrap items-center p-10">
                <label className="form-control w-full max-w-xs mr-5 mb-2">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      Montant
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Montant Avancé"
                    value={nouveauMontant}
                    onChange={handleNouveauMontantChange}
                    className="input bg-slate-100 border-primaryColor border-2"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>

                <label className="form-control w-full max-w-xs mr-5 mb-2">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      Balance
                    </span>
                  </div>
                  <input
                    type="text"
                    value={testAmount}
                    placeholder="Balance"
                    onChange={(e) => setUpdateBalance(e.target.value)}
                    className="input bg-slate-100 border-primaryColor border-2"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>

                <label className="form-control w-full max-w-xs mr-5 mb-2">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      Quel versement ?
                    </span>
                  </div>
                  <select
                    value={versement}
                    className="select bg-slate-100 border-primaryColor border-2"
                    onChange={(e) => setUpdateVersement(e.target.value)}>
                    <option value="">Versement</option>
                    <option value="Versement 1">Versement 1</option>
                    <option value="Versement 2">Versement 2</option>
                    <option value="Versement 3">Versement 3</option>
                    <option value="Versement arierer">Versement arierer</option>
                  </select>
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>

                <label className="form-control w-full max-w-xs mr-5 mb-2">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      Quel est le statut ?
                    </span>
                  </div>
                  <select
                    value={statut}
                    onChange={(e) => setUpdateStatut(e.target.value)}
                    className="select bg-slate-100 border-primaryColor border-2">
                    <option value="">Statut</option>
                    <option value="Non Payé">Non Payé</option>
                    <option value="Avance">Avance</option>
                    <option value="Payé">Payé</option>
                  </select>
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-5 mb-2">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      Le type de paiement ?
                    </span>
                  </div>
                  <select
                    value={mode}
                    onChange={(e) => setUpdateMode(e.target.value)}
                    className="select bg-slate-100 border-primaryColor border-2">
                    <option value="">Mode de paiement</option>
                    <option value="Cash">Cash</option>
                    <option value="Banque">Banque</option>
                    <option value="Chèque">Chèque</option>
                  </select>
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-5 mb-2">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      La date du paiement ?
                    </span>
                  </div>
                  <DatePicker
                    value={date}
                    className="input bg-slate-100 border-primaryColor border-2"
                    onChange={(date) => setDate(date)}
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>

                <button
                  className="btn bg-primaryColor text-white border-none 
                hover:bg-slate-100 hover:text-primaryColor font-normal"
                  type="submit">
                  Ajouter paiement
                </button>
              </div>
            </form>
          </div>
          {/* <h2>Résultat</h2>
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
                <td>{montantTotal}</td>
                <td>{testAmount}</td>
                <td>{date}</td>
                <td>{mode}</td>
                <td>{statut}</td>
              </tr>
            </tbody>
          </table> */}
        </div>
      </div>
    </>
  );
}
