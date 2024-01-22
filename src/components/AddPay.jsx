import { NavBar } from "./Navbar/NavBar.jsx";
import { NavLink} from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useState} from "react";
import { supabase } from "../Config/SupabaseConfig.jsx";
import "./AddPay.scss";

export function AddPay() {

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
          .textSearch("lastName", searchQuery )

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
            balance : testAmount,
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

  let testAmount =  balance - amount;

  console.log(testAmount)


  return (
    <>
      <NavBar />
        <div className="container_addPay">
          <div className="addPay_header">
            <NavLink className="text-2xl text-color1" to={"/payroll"}>
              <BiArrowBack />
            </NavLink>
            <div>
              <NavLink className="text-color2 hover:text-color1" to={"/dashboard"}>
                Dashboard
              </NavLink>
              <span className="m-5" id="span">
              |
              </span>
              <NavLink className="text-color2 hover:text-color1" to={"/staffs"}>
                Staffs
              </NavLink>
              <span className="m-5" id="span">
              |
              </span>
              <NavLink className="text-color2 hover:text-color1" to={"/addpay"}>
                Ajouter un payroll
              </NavLink>
            </div>
          </div>
          <div className="addPay_body">
            <div className="body_add">
              <h2>Ajouter un nouveau payroll</h2>
              {/*  */}
              <div id="add_list">
                <input
                  type="text"
                  id="sr"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher avec le nom..."
                />
                <button className={"btn bg-color2 text-white border-none hover:bg-color3"} onClick={handleSearch}>
                  Rechercher
                </button>
              </div>
              {searchResults.length > 0 && (
                <div className="overflow-x-auto mt-10  rounded-2xl">
                  <table className="table">
                    <thead className="text-color1" key="thead">
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
                  {/*  */}
                  <form onSubmit={handleTransferData}>
                    <div className="flex flex-wrap p-10">
                    <input
                      type="text"
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Montant Avancée"
                      className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs mt-10 mr-10 mb-10"
                    />
                    <input
                      type="text"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                      placeholder="Balance"
                      className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs mt-10 mr-10 mb-10"
                    />
                    <select
                      onChange={(e) => setStatut(e.target.value)}
                      name="stat"
                      className="select select-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs  mt-10"
                    >
                      <option value="0">Statut</option>
                      <option value="Non Payé">Non Payé</option>
                      <option value="Avance">Avance</option>
                      <option value="Payé">Payé</option>
                    </select>
                    <button className={"btn bg-color2 text-white border-none hover:bg-color3 ml-[56rem]"} type="submit">
                      Ajouter paiement
                    </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
    </>
  );
}
