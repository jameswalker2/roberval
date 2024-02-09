import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BiArrowBack, BiSolidAddToQueue, BiSolidPencil } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { supabase } from "../../Config/SupabaseConfig.jsx";
import StaffsAdd from "./StaffsAdd.jsx";
import StaffsUpdate from "./StaffsUpdate.jsx";

export function Staffs() {
  const [resultsStaffs, setResultsStaffs] = useState([]);
  const [searchStaff, setSearchStaff] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);

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
        }
      } catch (error) {
        console.log(error);
      }
    };

    return () => fetchStaffs();
  }, [searchStaff]);

  const config = {
    title: "Erreur !",
    content: (
      <>
        <h2 className="mt-5">
          {"Vous n'êtes pas autorisé à effectuer cette opération"}
        </h2>
      </>
    ),
  };

  const handleDelete = async (staffId) => {
    try {
      const { error } = await supabase
        .from("staffs")
        .delete()
        .eq("id", staffId)
        .single();

      if (error) {
        console.error(error);
        Modal.error(config);
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

  // console.log(selectedStaff);

  return (
    <>
      <div className="h-[100vh]">
        <Toaster />
        <div className="relative w-[90%] h-[7vh] bg-white top-10 left-20 rounded-full pl-5 pr-20 flex items-center justify-between mb-[80px] ">
          <NavLink className="text-2xl text-color1" to={"/dashboard"}>
            <BiArrowBack />
          </NavLink>
          <div>
            <NavLink className="link_el" to={"/dashboard"}>
              Dashboard{" "}
            </NavLink>
            <span className="m-5" id="span">
              |
            </span>
            <NavLink className="link_el" to={"/payroll"}>
              Payroll
            </NavLink>
          </div>
        </div>

        <div className="absolute left-20 p-5 bg-white w-[90%] rounded-2xl">
          <h2 className="text-[20px] font-medium text-color1 mb-5">
            Liste des staffs
          </h2>
          <div className="flex justify-around">
            <input
              onChange={(e) => setSearchStaff(e.target.value)}
              className="input input-bordered focus:file-input-primary w-[40rem] h-10 rounded-full bg-gray-100  "
              placeholder="Rechercher avec le nom"
              type="search"
            />
            <button
              onClick={openModal}
              className="btn border-none bg-color2 text-white hover:bg-color3 ">
              <BiSolidAddToQueue className="w-[20px] h-[20px] m-2" />
              Ajouter
            </button>
          </div>
        </div>

        <StaffsAdd visible={isAddModalVisible} onClose={closeModal} />
        <StaffsUpdate
          selectedStaffs={selectedStaff}
          visibleUp={isUpdateModalVisible}
          onCloseUp={closeUpdateModal}
        />

        <div className="overflow-x-auto absolute rounded left-20 mt-40 bg-white w-[90%] h-96">
          {resultsStaffs.length > 0 ? (
            <table className="table table-xs">
              <thead className="text-color2 text-sm bg-gray-50 hover:bg-gray-100">
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
              {resultsStaffs
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
                          <Button className="mr-2">
                            <BiSolidPencil
                              onClick={() => {
                                if (staff) {
                                  setSelectedStaff(staff);
                                  openUpdateModal();
                                } else {
                                  toast.error("Not Select");
                                }
                              }}
                              className="text-color2 cursor-pointer"
                            />
                          </Button>
                          <Button>
                            <FaRegTrashAlt
                              className="text-red-600 cursor-pointer"
                              onClick={() => handleDelete(staff.id)}
                            />
                          </Button>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          ) : (
            <p className="text-2xl flex justify-center mt-40">
              Aucun membre du personnel trouvé
            </p>
          )}
        </div>
      </div>
    </>
  );
}
