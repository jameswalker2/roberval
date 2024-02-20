import moment from "moment";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { supabase } from "@/Config/SupabaseConfig.jsx";
import { NavBar } from "@/components/Navbar/NavBar.jsx";
import DetailsPage from "./DetailsPage.jsx";
import "./Payroll.scss";
// import { FiMoreHorizontal } from "react-icons/fi";

export function Payroll() {
  const [selectedRole, setSelectedRole] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [role, setRole] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStaff, setSelectStaffs] = useState(null);
  const [isModalShow, setIsModalShow] = useState(false);

  const openIsModalShow = () => {
    setIsModalShow(true);
  };

  const closeIsModalShow = () => {
    setIsModalShow(false);
  };

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
        .from("pay")
        .delete()
        .eq("id", payId)
        .single();

      if (error) {
        console.log(error.message);
        toast.error("Vous n'êtes pas autorisé à effectuer cette opération");
      } else {
        console.log("Ok");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const expenseChannel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "pay" },
        (payload) => {
          const eventType = payload.eventType;
          const changedData = payload.new;

          switch (eventType) {
            case "INSERT":
              setStaffs((prevPay) => [...prevPay, changedData]);
              break;
            case "UPDATE":
              setStaffs((prevPay) => {
                return prevPay.map((pay) =>
                  pay.id === changedData.id ? changedData : pay,
                );
              });
              break;
            case "DELETE":
              setStaffs((prevPay) =>
                prevPay.filter((pay) => pay.id !== payload.old.id),
              );
              break;
          }
        },
      )
      .subscribe();

    return () => expenseChannel.unsubscribe();
  }, []);

  return (
    <>
      <NavBar />
      <Toaster position="top-right" />
      <div className="h-screen">
        <div className="container_all_pay">
          <div
            className="w-[75rem] h-[7vh]  bg-white top-10 left-[16%] rounded-full pl-5 pr-20 flex items-center
        justify-between mb-[10px] ">
            <h1 className="text-xl text-color1 font-semibold">Payroll</h1>
            <div>
              <NavLink
                className="text-color2 hover:text-color1"
                to={"/dashboard"}>
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
                <option value="" className="text-gray-300">
                  Recherche par role
                </option>
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
              <NavLink
                className={
                  "btn bg-color2 text-white w-48 hover:bg-color3 border-none"
                }
                to={"/addpay"}>
                + Générer une Payroll
              </NavLink>
            </div>
          </div>
          <div className="overflow-x-auto mt-5 bg-white h-96 rounded-2xl">
            {filterStaffs.length > 0 ? (
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
                      resultL.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      resultL.lastName
                        .toLowerCase()
                        .includes(search.toLowerCase()),
                  )
                  .map((staff) => (
                    <tbody key={staff.id} className="">
                      <tr>
                        <td>0{staff.id}</td>
                        <td>
                          {staff.name} {staff.lastName}
                        </td>
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
                                if (staff) {
                                  setSelectStaffs(staff);
                                  openIsModalShow();
                                } else {
                                  toast.error("Erreur !");
                                }
                              }}
                              className="btn btn-ghost btn-xs">
                              Détails
                            </button>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            ) : (
              <p className="text-2xl flex justify-center mt-40">
                Aucune payroll générée pour le moment
              </p>
            )}
          </div>
          <DetailsPage
            selectedStaff={selectedStaff}
            show={isModalShow}
            close={closeIsModalShow}
            deleteID={handleDelete}
          />
        </div>
      </div>
    </>
  );
}
