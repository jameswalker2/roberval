import { DatePicker, Modal } from "antd";
import dayjs from "dayjs";
import { AtSign, Cake, Contact, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [date, setDate] = useState(null);
  const [mode, setUpdateMode] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  // const [created_at, setCreated_at] = useState("");
  const [nouveauMontant, setNouveauMontant] = useState(0);
  // const [getID, setGetID] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      const { data, error } = await supabase
        .from("generated_payroll")
        .select(`*, staffs (*)`)
        .eq("staffs_id", id)
        .single();

      console.log(id);
      if (data) {
        setName(data.staffs.name);
        setLastName(data.staffs.lastName);
        setRole(data.role);
        setPhone(data.staffs.phone);
        setAmount(data.amount);
        setUpdateBalance(data.balance);
        setUpdateVersement(data.versement);
        setUpdateStatut(data.statut);
        // setCreated_at(data.created_at);
        setUpdateMode(data.mode);
        setAddress(data.staffs.adress);
        setBirth(data.staffs.birth);
        // setGetID(data);
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
      const { error1 } = await supabase
        .from("generated_payroll")
        .update({
          amount: montantTotal,
          balance: testAmount,
          versement,
          statut,
          mode,
          date,
        })
        .eq("staffs_id", id)
        .select("id");

      if (error1) {
        throw error1;
      }

      const { error2 } = await supabase
        .from("expense")
        .update({ amount: montantTotal, date: date })
        .eq("expenseID", id)
        .select("id");

      if (error2) {
        error2;
      }

      const { error3 } = await supabase.from("history_payroll").insert({
        amount,
        balance: testAmount,
        statut,
        mode,
        date,
        // expenseID:
      });

      if (error3) {
        throw error3;
      } else {
        Modal.success({
          content: "Payroll ajouter avec success !",
          okButtonProps: { type: "default" },
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      Modal.error({
        title: "Erreur ! Essayer à nouveau",
        okButtonProps: {
          type: "default",
        },
      });
      console.log(error);
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
          <h1 className="font-semibold text-2xl">Ajouter Payroll</h1>
          <ul>
            <li>
              <NavLink className="text-supportingColor1" to={"/dashboard"}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className="text-supportingColor1" to={"/staffs"}>
                staffs
              </NavLink>
            </li>
            <li>
              <NavLink className="text-supportingColor1" to={"/payroll"}>
                Payroll
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap justify-between w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <div className="flex items-center justify-center bg-primaryColor bg-opacity-35 w-[24%] h-auto p-3 rounded-lg">
            <span className="mr-4 bg-primaryColor rounded-full w-12 h-12 flex justify-center items-center">
              <Contact className="text-white" size={30} strokeWidth={1.5} />
            </span>
            <span>
              <h2 className="font-bold text-supportingColor1 text-xl">
                {name} {lastName}
              </h2>
              <p className="text-supportingColor1 text-sm">{role}</p>
            </span>
          </div>

          <div className="flex items-center justify-center bg-supportingColor2 bg-opacity-35 w-[24%] h-auto p-3  ml-2 rounded-lg">
            <span className="mr-4 bg-supportingColor2 rounded-full w-12 h-12 flex justify-center items-center">
              <Cake className="text-white" size={30} strokeWidth={1.5} />
            </span>
            <span>
              <h2 className="font-bold text-supportingColor1 text-xl">
                Anniversaire
              </h2>
              <p className="text-supportingColor1 text-sm">
                {dayjs(birth).format("DD MMM YYYY")}
              </p>
            </span>
          </div>

          <div className="flex items-center justify-center bg-supportingColor3 bg-opacity-35 w-[24%] h-auto p-3  ml-2 rounded-lg">
            <span className="mr-4 bg-supportingColor3 rounded-full w-12 h-12 flex justify-center items-center">
              <AtSign className="text-white" size={30} strokeWidth={1.5} />
            </span>
            <span>
              <h2 className="font-bold text-supportingColor1 text-xl">
                Addresse
              </h2>
              <p className="text-supportingColor1 text-sm">{address}</p>
            </span>
          </div>

          <div className="flex items-center justify-center bg-supportingColor4 bg-opacity-35 w-[24%] h-auto p-3  ml-2 rounded-lg">
            <span className="mr-4 bg-supportingColor4 rounded-full w-12 h-12 flex justify-center items-center">
              <Smartphone className="text-white" size={30} strokeWidth={1.5} />
            </span>
            <span>
              <h2 className="font-bold text-supportingColor1 text-xl">
                Téléphone
              </h2>
              <p className="text-supportingColor1 text-sm">{phone}</p>
            </span>
          </div>
        </div>

        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <div>
            <h2>Payroll info</h2>
            <form onSubmit={handleUpdatePay}>
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
                    placeholder="Balance"
                    value={testAmount}
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
                      Le type de payroll ?
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
                      La date du payroll ?
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

                <label className="form-control ml-48 mt-10 mb-2">
                  <button
                    className="btn bg-primaryColor text-white border-none 
                hover:bg-slate-100 hover:text-primaryColor font-normal"
                    type="submit">
                    Ajouter payroll
                  </button>
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
