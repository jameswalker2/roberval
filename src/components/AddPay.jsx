import { Search } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../Config/SupabaseConfig.jsx";
import "./AddPay.scss";
import { NavBar } from "./Navbar/NavBar.jsx";

export function AddPay() {
  const navigate = useNavigate();
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
        .textSearch("lastName", searchQuery);

      if (error) {
        throw error;
      } else {
        setSearchResults(data);
      }
    } catch (error) {
      console.error(error.message);
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
            balance: testAmount,
            statut,
            role,
            date,
            mode,
          },
        ]);
        if (error) {
          throw error;
        } else {
          toast.success("Payroll générer avec succès !");
          setSearchResults([]);
          setTimeout(() => {
            navigate("/payroll");
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
    setSearchQuery("");
  };

  let testAmount = balance - amount;

  return (
    <>
      <NavBar />
      <Toaster position="top-right" />
      <div className="h-screen overflow-scroll pl-64 py-5 bg-primaryColor bg-opacity-10">
        <div className="text-sm breadcrumbs flex items-center justify-between w-[95%] h-16 p-4 text-supportingColor1 bg-white rounded-lg shadow-sm">
          <NavLink to={"/payroll"}>
            <BiArrowBack className="h-8 w-8 p-1 text-primaryColor hover:bg-slate-100 rounded-full" />
          </NavLink>
          <ul>
            <li>
              <NavLink className="text-supportingColor1" to={"/dashboard"}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className="text-supportingColor1" to={"/payroll"}>
                Payroll
              </NavLink>
            </li>
            <li>
              <NavLink className="text-supportingColor1" to={"/addpay"}>
                Ajouter un nouveau payroll
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <div className="mb-5 font-medium">
            <h2>Selectionner les critères</h2>
          </div>
          <div className="flex flex-wrap justify-center">
            <input
              type="text"
              className="input w-96 bg-slate-100 border-primaryColor border-2"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher avec le prénom"
            />
            <button
              className="btn ml-52 bg-primaryColor text-white border-none 
              hover:bg-slate-100 hover:text-primaryColor font-normal"
              onClick={handleSearch}>
              <Search size={20} />
              Rechercher
            </button>
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="overflow-y-hidden overflow-x-auto w-[95%] h-auto mt-10 rounded-lg bg-white p-4 shadow-sm">
            <h2 className="mb-5 font-medium">Résultat de la recherche</h2>
            <table className="table">
              <thead
                className="text-supportingColor1 text-sm bg-primaryColor bg-opacity-10"
                key="thead">
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Adresse</th>
                  <th>Role</th>
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
                    <td>{staff.role}</td>
                    <td>{staff.phone}</td>
                    <td>{staff.email}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
            <h2 className="font-medium">Information pour générer</h2>
            <form onSubmit={handleTransferData}>
              <div className="flex flex-wrap p-10">
                <label className="form-control w-full max-w-xs mr-5 mb-2">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      Montant Annuel
                    </span>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Montant Avancée"
                    className="input bg-slate-100 border-primaryColor border-2"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-5 mb-2">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      Balance Annuel
                    </span>
                  </div>
                  <input
                    type="text"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    placeholder="Balance"
                    className="input bg-slate-100 border-primaryColor border-2"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-5 mb-2">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      Statut Annuel
                    </span>
                  </div>
                  <select
                    onChange={(e) => setStatut(e.target.value)}
                    name="stat"
                    className="select w-full max-w-xs bg-slate-100 border-primaryColor border-2">
                    <option value={"0"} className="text-gray-400">
                      Statut
                    </option>
                    <option value="Non Payé">Non Payé</option>
                    <option value="Avance">Avance</option>
                    <option value="Payé">Payé</option>
                  </select>
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
              </div>
              <div className="text-right mr-[10.5%]">
                <button
                  className="btn bg-primaryColor text-white border-none 
                  hover:bg-slate-100 hover:text-primaryColor font-normal"
                  type="submit">
                  Générer le nouveau paiement
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
