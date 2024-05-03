import { supabase } from "@/Config/SupabaseConfig.jsx";
import { NavBar } from "@/components/Navbar/NavBar.jsx";
import { Empty, Modal, Pagination } from "antd";
import { FilePlus2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DetailsPage from "./DetailsPage.jsx";
import "./Payroll.scss";

const paiementPerPage = 20;
export function Payroll() {
  const [selectedRole, setSelectedRole] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [role, setRole] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedStaff, setSelectStaffs] = useState(null);
  const [isModalShow, setIsModalShow] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(false);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const { data, error } = await supabase
          .from("generated_payroll")
          .select(`*, staffs (*)`)
          .order("created_at", { ascending: false })
          .textSearch(search);

        if (data) {
          setStaffs(data);
          console.log(data);
          setRole([...new Set(data.map((staff) => staff.role))]);
          setPayroll([...new Set(data.map((payroll) => payroll.statut))]);
        } else {
          console.log(error.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStudents();
  }, [search]);

  const handleDelete = async (payId) => {
    try {
      const { error } = await supabase
        .from("generated_payroll")
        .delete()
        .eq("id", payId)
        .single();

      if (error) {
        console.log(error.message);
        Modal.error({
          title: "Erreur !",
          content: "Vous n'êtes pas autorisé à effectuer cette opération",
          okButtonProps: { type: "default" },
        });
      } else {
        console.log("Ok");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const openIsModalShow = () => {
    setIsModalShow(true);
  };

  const closeIsModalShow = () => {
    setIsModalShow(false);
  };

  const collectionRole = role.map((category) => ({
    value: category,
    label: category,
  }));

  const collectionPayroll = payroll.map((category) => ({
    value: category,
    label: category,
  }));

  const filterPaieByCriteria = (staffs, selectedRole, selectedPayroll) => {
    return staffs.filter((staff) => {
      const meetsCategoryCriteria =
        !selectedRole || staff.role === selectedRole;
      const meetsPaiementCriteria =
        !selectedPayroll || staff.statut === selectedPayroll;
      return meetsCategoryCriteria && meetsPaiementCriteria;
    });
  };

  const startIndex = (currentPage - 1) * paiementPerPage;
  const endIndex = startIndex + paiementPerPage;
  const filterPayroll = filterPaieByCriteria(
    staffs,
    selectedRole,
    selectedPayroll,
  );
  const paginatedPayroll = filterPayroll.slice(startIndex, endIndex);

  useEffect(() => {
    const expenseChannel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "generated_payroll" },
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
      <div className="h-screen overflow-scroll pl-64 py-5 bg-primaryColor bg-opacity-10">
        <div className="text-sm breadcrumbs flex items-center justify-between w-[95%] h-16 p-4 text-supportingColor1 bg-white rounded-lg shadow-sm">
          <h1 className="font-semibold text-2xl">Payroll</h1>
          <ul>
            <li>
              <NavLink className="text-supportingColor1" to={"/dashboard"}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className="text-supportingColor1" to={"/staffs"}>
                Staffs
              </NavLink>
            </li>
            <li>
              <NavLink className="text-supportingColor1" to={"/payroll"}>
                Payroll
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <div className={"flex justify-between mb-5"}>
            <h2 className="font-medium text-supportingColor1 mb-5">
              Selectionner les critères
            </h2>
            <NavLink to={"/addpay"}>
              <button className="btn font-normal bg-primaryColor border-none text-white hover:text-primaryColor hover:bg-slate-100">
                <FilePlus2 />
                Générer un nouveau payroll
              </button>
            </NavLink>
          </div>

          <div className={"flex justify-around"}>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="select bg-white border-2 border-primaryColor text-supportingColor1 w-full max-w-xs focus:select-primary">
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
            <select
              value={selectedPayroll}
              onChange={(e) => setSelectedPayroll(e.target.value)}
              className="select bg-white border-2 border-primaryColor text-supportingColor1 w-full max-w-xs focus:select-primary">
              <option value="" className="text-gray-300">
                Recherche par payroll
              </option>
              {collectionPayroll.map((option) => (
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
              className="input input-bordered w-96 border-primaryColor border-2 rounded-lg bg-white
              focus:file-input-primaryColor"
              placeholder="Rechercher avec le nom..."
            />
          </div>
        </div>

        <div className="overflow-y-hidden overflow-x-auto w-[95%] h-auto mt-10 rounded-lg bg-white p-4 shadow-sm">
          {paginatedPayroll.length > 0 ? (
            <div>
              <table className="table">
                <thead
                  className="text-supportingColor1 text-sm bg-primaryColor bg-opacity-10"
                  key="thead">
                  <tr>
                    <th>ID</th>
                    <th>Nom Complet</th>
                    <th>Role</th>
                    <th>Téléphone</th>
                    <th>Date de création</th>
                    <th>Valeur Avancée</th>
                    <th>Balance</th>
                    {/*<th>Date</th>*/}
                    <th>Statut</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {paginatedPayroll.map((staff) => (
                  <tbody key={staff.id} className="">
                    <tr>
                      <td>0{staff.id}</td>
                      <td>
                        {staff.staffs.name} {staff.staffs.lastName}
                      </td>
                      <td>{staff.role}</td>
                      <td>{staff.staffs.phone}</td>
                      <td>{moment(staff.created_at).format("DD/MM/YYYY")}</td>
                      <td>$ {staff.amount}</td>
                      <td>$ {staff.balance}</td>
                      <td>
                        <p
                          style={{
                            backgroundColor:
                              staff.statut === "Non Payé"
                                ? "#FD6477"
                                : staff.statut === "Avance"
                                ? "#FFBF5A"
                                : "#5AD374",
                          }}
                          className={
                            "text-white text-center p-1 rounded-lg font-medium"
                          }>
                          {staff.statut}
                        </p>
                      </td>
                      <td>
                        <span>
                          <button
                            onClick={() => {
                              if (staff) {
                                setSelectStaffs(staff);
                                openIsModalShow();
                              } else {
                                console.log("Erreur technique !");
                              }
                            }}
                            className="btn btn-xs text-xs h-10 w-20 border-none text-white bg-primaryColor
                            hover:bg-slate-100 hover:text-primaryColor active:bg-slate-100">
                            Détails
                          </button>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
              <Pagination
                current={currentPage}
                pageSize={paiementPerPage}
                total={filterPayroll.length}
                onChange={(page) => setCurrentPage(page)}
                className="text-center mt-10"
              />
            </div>
          ) : (
            <Empty description={"Aucune paiement générer"} />
          )}
        </div>
        <DetailsPage
          selectedStaff={selectedStaff}
          show={isModalShow}
          close={closeIsModalShow}
          deleteID={handleDelete}
        />
      </div>
    </>
  );
}
