import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavBar } from "../components/Navbar/NavBar.jsx";
import { supabase } from "../Config/SupabaseConfig.jsx";
import moment from "moment";
import {toast} from "react-hot-toast";
import "./Payroll.scss";
// import { FiMoreHorizontal } from "react-icons/fi";

export function Payroll() {
  const [selectedRole, setSelectedRole] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [role, setRole] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectStudent] = useState(null)


  useEffect(() => {
    const getStudents = async () => {
      try {
        const { data, error } = await supabase
          .from("pay")
          .select("*")
          .textSearch(search);

        if (data) {
          setStaffs(data);
          setRole([...new Set(data.map((staff) => staff.role))]);
        } else {
          console.log(error.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStudents();
  }, [search]);

  const collectionRole = role.map((category) => ({
    value: category,
    label: category,
  }));

  const filterStaffs = selectedRole
      ? staffs.filter((staff) => staff.role === selectedRole)
      : staffs;

  const handleDelete = async (payId) => {

    try {
      const { error } = await supabase
          .from('pay')
          .delete()
          .eq('id', payId)

      if (error) {
        console.error(error);
      } else {
        document.getElementById('my_modal_1').close();
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    const expenseChannel = supabase
        .channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'pay' },
            (payload) => {
              const eventType = payload.eventType;
              const changedData = payload.new;

              switch (eventType) {
                case "INSERT":
                  setStaffs((prevPay) => [... prevPay, changedData])
                  break;
                case "UPDATE":
                  setStaffs((prevPay) => {
                    return prevPay.map((pay) => pay.id === changedData.id ? changedData : pay)})
                  break;
                case "DELETE":
                  setStaffs((prevPay) =>
                      prevPay.filter((pay) => pay.id !== payload.old.id ))
                  break;

              }
            }
        ).subscribe();

    return () => expenseChannel.unsubscribe();
  }, [])

  return (
    <>
      <NavBar />
        <div className="container_all_pay">
        <div className="w-[75rem] h-[7vh]  bg-white top-10 left-[16%] rounded-full pl-5 pr-20 flex items-center
        justify-between mb-[10px] ">
          <h1 className="text-xl text-color1 font-semibold">Payroll</h1>
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
          </div>

      </div>
          <div className="container_search_pay">
            <div className="flex flex-wrap justify-around">
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="select select-bordered focus:select-primary bg-gray-200 w-full max-w-xs mr-10">
                  <option value="" className="text-gray-300">Recherche par role</option>
                  {collectionRole.map((option) => (
                      <option
                          className="text-black"
                          key={option.value}
                          value={option.value}>
                        {option.label}
                      </option>
                  ))}
                </select>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
                  placeholder="Rechercher avec le nom..."
              />
              <NavLink className={"btn bg-color2 text-white hover:bg-color3 border-none"} to={"/addpay"}>
                + Ajouter
              </NavLink>
            </div>
          </div>

          <div className="overflow-x-auto mt-5 bg-white h-96 rounded-2xl">
            <table className="table">
              <thead className="text-color1" key="thead">
                <tr>
                  <th>ID</th>
                  <th>Nom Complet</th>
                  <th>Role</th>
                  <th>Téléphone</th>
                  <th>Date de création</th>
                  <th>Valeur Avancée</th>
                  <th>Balance</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              {filterStaffs
                .filter(
                  (resultL) =>
                    resultL.name.toLowerCase().includes(search.toLowerCase()) ||
                    resultL.lastName.toLowerCase().includes(search.toLowerCase())
                )
                .map((staff) => (
                  <tbody key={staff.id} className="">
                    <tr>
                      <td>0{staff.id}</td>
                      <td>{staff.name} {staff.lastName}</td>
                      <td>{staff.role}</td>
                      <td>{staff.phone}</td>
                      <td>{moment(staff.created_at).format("DD/MM/YYYY")}</td>
                      <td>$ {staff.amount}</td>
                      <td>$ {staff.balance}</td>
                      <td>{staff.date}</td>
                      <td
                        id="non"
                        style={{
                          color:
                            staff.statut === "Non Payé"
                              ? "red"
                              : staff.statut === "Avance"
                              ? "#ffa901"
                              : "green",
                          fontSize: "13px",
                          fontWeight: "700",
                        }}>
                        {staff.statut}
                      </td>
                      <td>
                        <span>
                          <button
                              onClick={() => {
                                setSelectStudent(staff)
                                document.getElementById('my_modal_1').showModal()
                              }}
                              className="btn btn-ghost btn-xs">Détails</button>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
          <dialog id="my_modal_1" className={"modal"} >
            <div className="modal-box bg-white w-full max-w-xl">
              {selectedStudent && (
                  <div>
                    <h2 className="text-center font-semibold uppercase">{selectedStudent.firstName} {selectedStudent.lastName}</h2>
                    <p className="text-center">{selectedStudent.role}</p>

                    <NavLink to={"/update-pay/" + selectedStudent.id}
                             className="btn bg-color2 hover:bg-color3 border-none text-white mx-20">Ajouter Payroll
                    </NavLink>
                    <button
                        onClick={() => handleDelete(selectedStudent.id)}
                        className="btn bg-red-600 border-none text-white m-10 hover:bg-red-700">Delete
                    </button>
                  </div>
              )
              }
              <button
                  onClick={() => document.getElementById('my_modal_1').close()}
                  type={"button"} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
              </button>
            </div>
          </dialog>
        </div>
    </>
  );
}
