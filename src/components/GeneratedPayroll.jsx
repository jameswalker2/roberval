import { Modal } from "antd";
import dayjs from "dayjs";
import { Search } from "lucide-react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../Config/SupabaseConfig.jsx";
import "./AddPay.scss";
import { NavBar } from "./Navbar/NavBar.jsx";

export function GeneratedPayroll() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStaffs, setSelectedStaffs] = useState(null);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [statut, setStatut] = useState("");

  const handleSearch = async () => {
    try {
      const { data, error } = await supabase
        .from("staffs")
        .select()
        .textSearch("name", searchQuery);

      if (error) {
        throw error;
      } else {
        setSearchResults(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleSelectStaffID = (staffID) => {
    const updatedStaffs = searchResults.map((staff) => {
      if (staff.id === staffID) {
        return { ...staff, selected: !staff.selected };
      }
      return { ...staff, selected: false };
    });
    setSearchResults(updatedStaffs);
    setSelectedStaffs(staffID);
  };

  const toggleSelectStaffsRole = (staffRole) => {
    const updatedStudents = searchResults.map((staff) => {
      if (staff.id === staffRole) {
        return { ...staff, selected: !staff.selected };
      }
      return { ...staff, selected: false };
    });
    setSearchResults(updatedStudents);
    setSelectedStaffs(staffRole);
  };

  const handleTransferData = async (e) => {
    const selectedStaffsObj = searchResults.find(
      (student) => student.id === selectedStaffs,
    );
    e.preventDefault();

    try {
      const { staff_id, role, created_at, name, lastName } = selectedStaffsObj;
      const { error1 } = await supabase.from("generated_payroll").insert([
        {
          staffs_id: staff_id,
          amount,
          balance: balance,
          statut,
          role,
        },
      ]);

      if (error1) {
        throw error1;
      }

      const { error2 } = await supabase.from("history_payroll").insert([
        {
          generated_staff_id: staff_id,
          amount,
          balance,
          statut,
          role,
        },
      ]);

      if (error2) {
        throw error2;
      }

      const { error3 } = await supabase.from("expense").insert([
        {
          name: `${name} ${lastName}`,
          expenseID: staff_id,
          amount,
          type: "Avance Salaire",
          what: "Avance Salaire",
          date: dayjs(created_at).format("YYYY MM DD"),
        },
      ]);

      if (error3) {
        throw error3;
      } else {
        Modal.success({
          title: "Succès !",
          content: "Payroll généré avec succès !",
          okButtonProps: { type: "default" },
        });
        setSearchResults([]);
        setTimeout(() => {
          navigate("/payroll");
        }, 1000);
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
    setSearchQuery("");
  };

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

        <div>
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
                    <th></th>
                  </tr>
                </thead>
                {searchResults.map((staff) => (
                  <tbody key={staff.staffs_id}>
                    <tr>
                      <td>{staff.id}</td>
                      <td>{staff.name}</td>
                      <td>{staff.lastName}</td>
                      <td>{staff.adress}</td>
                      <td>{staff.role}</td>
                      <td>{staff.phone}</td>
                      <td>{staff.email}</td>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox border-2 border-primaryColor"
                          checked={staff.selected}
                          onChange={() => {
                            toggleSelectStaffsRole(staff.role);
                            toggleSelectStaffID(staff.id);
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          )}
        </div>

        {searchResults.some((staff) => staff.selected) > 0 && (
          <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
            <h2 className="font-medium">Information pour générer</h2>
            <form onSubmit={handleTransferData}>
              <div className="flex flex-wrap items-center p-10">
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
                <div className="mr-[10.5%]">
                  <button
                    className="btn bg-primaryColor text-white border-none 
                  hover:bg-slate-100 hover:text-primaryColor font-normal"
                    type="submit">
                    Générer le nouveau payroll
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
