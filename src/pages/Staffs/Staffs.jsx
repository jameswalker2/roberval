import { NavBar } from "@/components/Navbar/NavBar.jsx";
import "@/pages/Staffs/Modal.scss";
import { Empty, Modal, Pagination } from "antd";
import { CopyPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../../Config/SupabaseConfig.jsx";
import StaffsAdd from "./StaffsAdd.jsx";
import StaffsUpdate from "./StaffsUpdate.jsx";

const staffsPerPage = 20;

export function Staffs() {
  const [resultsStaffs, setResultsStaffs] = useState([]);
  const [searchStaff, setSearchStaff] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [role, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState(false);

  const openModal = () => {
    setAddModalVisible(true);
  };

  const closeModal = () => {
    setAddModalVisible(false);
  };

  const openUpdateModal = () => {
    setUpdateModalVisible(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalVisible(false);
  };

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const { data } = await supabase
          .from("staffs")
          .select("*")
          .textSearch(searchStaff);

        if (data) {
          setResultsStaffs(data);
          setRole([...new Set(data.map((staffs) => staffs.role))]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStaffs(currentPage);
  }, [searchStaff, currentPage]);

  const handleDelete = async (staffId) => {
    try {
      const { error } = await supabase
        .from("staffs")
        .delete()
        .eq("id", staffId)
        .single();

      if (error) {
        console.error(error);
        Modal.error({
          title: "Erreur !",
          content: "Vous n'êtes pas autorisé pour cette opération !",
          okButtonProps: {
            type: "default",
          },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const collectionOptionsSorted = role.map((category) => ({
    value: category,
    label: category,
  }));

  const filterStaffs = selectedRole
    ? resultsStaffs.filter((staffs) => staffs.role === selectedRole)
    : resultsStaffs;

  const startIndex = (currentPage - 1) * staffsPerPage;
  const endIndex = startIndex + staffsPerPage;
  const paginatedStaffs = filterStaffs
    .filter(
      (result) =>
        result.name.toLowerCase().includes(searchStaff.toLowerCase()) ||
        result.lastName.toLowerCase().includes(searchStaff.toLowerCase()),
    )
    .slice(startIndex, endIndex);

  useEffect(() => {
    const expenseChannel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "staffs" },
        (payload) => {
          const eventType = payload.eventType;
          const changedData = payload.new;

          switch (eventType) {
            case "INSERT":
              setResultsStaffs((prevExpense) => [...prevExpense, changedData]);
              break;
            case "UPDATE":
              setResultsStaffs((prevExpenses) => {
                return prevExpenses.map((expense) =>
                  expense.id === changedData.id ? changedData : expense,
                );
              });
              break;
            case "DELETE":
              setResultsStaffs((prevExpenses) =>
                prevExpenses.filter((expense) => expense.id !== payload.old.id),
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
      <div className="h-screen overflow-y-scroll pl-64 py-5 bg-primaryColor bg-opacity-10">
        <div
          className={
            "text-sm breadcrumbs flex items-center justify-between w-[95%] h-16 p-4 " +
            "text-supportingColor1 bg-white rounded-lg shadow-sm"
          }>
          <h1 className="font-semibold text-2xl">Staffs</h1>
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
          </ul>
        </div>

        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-medium text-supportingColor1 mb-5">
              Selectionner les critères
            </h2>
            <button
              onClick={openModal}
              className="btn font-normal bg-primaryColor border-none text-white hover:text-primaryColor hover:bg-slate-100">
              <CopyPlus />
              Nouveau Membre
            </button>
          </div>
          <div className="flex items-center justify-around">
            <select
              onChange={(e) => setSelectedRole(e.target.value)}
              className="select select-bordered w-full max-w-xs mr-20 bg-primaryColor text-white">
              <option value="" className="text-gray-300">
                Recherche par role
              </option>
              {collectionOptionsSorted.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              onChange={(e) => setSearchStaff(e.target.value)}
              className="input input-bordered w-[40rem] border-primaryColor border-2 rounded-lg bg-white
              focus:file-input-primaryColor"
              placeholder="Rechercher avec le nom"
              type="search"
            />
          </div>
        </div>

        <StaffsAdd visible={isAddModalVisible} onClose={closeModal} />
        <StaffsUpdate
          selectedStaffs={selectedStaff}
          visibleUp={isUpdateModalVisible}
          onCloseUp={closeUpdateModal}
        />

        <div className="overflow-y-hidden overflow-x-auto w-[95%] h-auto mt-10 rounded-lg bg-white p-4 shadow-sm">
          {paginatedStaffs.length > 0 ? (
            <div>
              <div className="mb-5">
                <h2 className="font-medium text-supportingColor1">
                  Liste des membres
                </h2>
                <p className="text-primaryColor text-sm">
                  Total de{" "}
                  <span className="font-semibold">{filterStaffs.length}</span>{" "}
                  sur{" "}
                  <span className="font-semibold">{resultsStaffs.length}</span>{" "}
                  lignes
                </p>
              </div>
              <table className="table table-xs">
                <thead className="text-supportingColor1 text-sm bg-primaryColor bg-opacity-10">
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Role</th>
                    <th>Adresse</th>
                    <th>Téléphone</th>
                    <th>Gmail</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {paginatedStaffs
                  .filter(
                    (staff) =>
                      staff.name
                        .toLowerCase()
                        .includes(searchStaff.toLowerCase()) ||
                      staff.lastName
                        .toLowerCase()
                        .includes(searchStaff.toLowerCase()),
                  )
                  .map((staff) => (
                    <tbody key={staff.id} className="font-semibold">
                      <tr>
                        <td>0{staff.id}</td>
                        <td>{staff.name}</td>
                        <td>{staff.lastName}</td>
                        <td>{staff.role}</td>
                        <td>{staff.adress}</td>
                        <td>{staff.phone}</td>
                        <td>{staff.email}</td>
                        <td>
                          <span className="flex justify-flex-start">
                            <div className="dropdown dropdown-end">
                              <div
                                tabIndex={0}
                                role="button"
                                className={
                                  "btn btn-xs text-xs h-10 w-20 border-none text-white bg-primaryColor " +
                                  "hover:bg-slate-100 hover:text-primaryColor active:bg-slate-100"
                                }>
                                Détails
                              </div>
                              <ul className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-32">
                                <li className="text-supportingColor4 hover:bg-slate-100 rounded-box mb-2">
                                  <button
                                    onClick={() => {
                                      if (staff) {
                                        setSelectedStaff(staff);
                                        openUpdateModal();
                                      } else {
                                        console.log("Please select");
                                      }
                                    }}
                                    className={
                                      "flex items-center bg-supportingColor4 text-white font-medium " +
                                      "border-none hover:bg-slate-100 hover:text-supportingColor4 active:bg-slate-100"
                                    }>
                                    Modifier
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className={
                                      "flex items-center bg-supportingColor3 text-white font-medium" +
                                      "border-none hover:bg-slate-100 hover:text-supportingColor3 active:bg-slate-100"
                                    }
                                    onClick={() => handleDelete(staff.id)}>
                                    Supprimer
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
              <Pagination
                current={currentPage}
                pageSize={staffsPerPage}
                total={resultsStaffs.length}
                onChange={(page) => setCurrentPage(page)}
                className="text-center mt-5"
              />
            </div>
          ) : (
            <Empty description={"Aucune donnée disponible"} />
          )}
        </div>
      </div>
    </>
  );
}
