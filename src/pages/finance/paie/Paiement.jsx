import { supabase } from "@/Config/SupabaseConfig.jsx";
import { NavBar } from "@/components/Navbar/NavBar.jsx";
import { Empty, Modal } from "antd";
import { FilePlus2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ModalPaie from "./ModalPaie";
import "./Paiement.scss";

export function Paiement() {
  const [studentsP, setStudentsP] = useState([]);
  const [classes, setClasses] = useState([]);
  const [paiement, setPaiement] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedPaiement, setSelectedPaiement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getPaiement = async () => {
      try {
        const { data, error } = await supabase
          .from("generated_paiement")
          .select(`*, students (*)`)
          .order("created_at", { ascending: false })
          .textSearch(search);

        if (data) {
          setStudentsP(data);
          setClasses([
            ...new Set(data.map((student) => student.students.classe)),
          ]);
          setPaiement([...new Set(data.map((paie) => paie.statut))]);
        } else {
          throw error;
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPaiement();
  }, [search]);

  const handleDelete = async (paieId) => {
    try {
      const { error } = await supabase
        .from("generated_paiement")
        .delete()
        .eq("id", paieId)
        .single();

      if (error) {
        Modal.error({
          title: "Erreur !",
          content: "Vous n'êtes pas autorisé à effectuer cette opération",
          okButtonProps: { type: "default" },
        });
      } else {
        handleCloseModalPaiement();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModalPaiement = () => {
    setShowModal(true);
  };

  const handleCloseModalPaiement = () => {
    setShowModal(false);
  };

  const collectionOptions = classes.map((category) => ({
    value: category,
    label: category,
  }));

  const filterStudents = selectedCategory
    ? studentsP.filter((student) => student === selectedCategory)
    : studentsP;
  useEffect(() => {
    const expenseChannel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "generated_paiement" },
        (payload) => {
          const eventType = payload.eventType;
          const changedData = payload.new;

          switch (eventType) {
            case "INSERT":
              setStudentsP((prevPaie) => [...prevPaie, changedData]);
              break;
            case "UPDATE":
              setStudentsP((prevPaie) => {
                return prevPaie.map((paie) =>
                  paie.id === changedData.id ? changedData : paie,
                );
              });
              break;
            case "DELETE":
              setStudentsP((prevPaie) =>
                prevPaie.filter((paie) => paie.id !== payload.old.id),
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
          <h1 className="font-semibold text-2xl">Paiement</h1>
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
        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <div className={"flex justify-between mb-5"}>
            <h2 className="font-medium text-supportingColor1 mb-5">
              Selectionner les critères
            </h2>
            <NavLink to={"/addpaie"}>
              <button className="btn font-normal bg-primaryColor border-none text-white hover:text-primaryColor hover:bg-slate-100">
                <FilePlus2 />
                Générer un paiement
              </button>
            </NavLink>
          </div>

          <div className={"flex justify-around"}>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered bg-primaryColor text-white w-full max-w-xs focus:select-primary ">
              <option value="" className="text-gray-300">
                Recherche par classe
              </option>

              {collectionOptions.map((option) => (
                <option
                  className="text-black"
                  key={option.value}
                  value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered bg-primaryColor text-white w-full max-w-xs focus:select-primary ">
              <option value="" className="text-gray-300">
                Recherche par classe
              </option>

              {collectionOptions.map((option) => (
                <option
                  className="text-black"
                  key={option.value}
                  value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              placeholder="Recherche par nom"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-96 border-primaryColor border-2 rounded-lg bg-white
              focus:file-input-primaryColor"
              type="search"
            />
          </div>
        </div>
        <div className="overflow-y-hidden overflow-x-auto w-[95%] h-auto mt-10 rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-5 font-medium">Liste paiement générer</h2>
          {filterStudents.length > 0 ? (
            <table className="table">
              <thead className="text-supportingColor1 text-sm bg-primaryColor bg-opacity-10">
                <tr>
                  <th>ID</th>
                  <th>Classe</th>
                  <th>Nom Complet</th>
                  <th>Date de création</th>
                  <th>Montant Avancée</th>
                  <th>Bourse</th>
                  <th>Balance</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              {filterStudents
                .filter(
                  (resultL) =>
                    resultL.students.firstName
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    resultL.students.lastName
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                )
                .map((student) => (
                  <tbody key={student.id} className="scroll">
                    <tr>
                      <td>0{student.students.id}</td>
                      <td>{student.students.classe}</td>
                      <td>
                        {student.students.firstName} {student.students.lastName}
                      </td>
                      <td>{moment(student.created_at).format("DD/MM/YYYY")}</td>
                      <td>{student.amount}</td>
                      <td>{student.bourse}</td>
                      <td>{student.balance}</td>
                      <td>
                        <p
                          style={{
                            backgroundColor:
                              student.statut === "Non Payé"
                                ? "#FD6477"
                                : student.statut === "Avance"
                                ? "#FFBF5A"
                                : "#5AD374",
                          }}
                          className={
                            "text-white text-center p-1 rounded-lg font-medium"
                          }>
                          {student.statut}
                        </p>
                      </td>
                      <td>
                        <span>
                          <button
                            onClick={() => {
                              if (student) {
                                handleShowModalPaiement();
                                setSelectedPaiement(student);
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
          ) : (
            <Empty description={"Aucune paiement générer"} />
          )}
        </div>
        <ModalPaie
          paiementId={selectedPaiement}
          onClose={handleCloseModalPaiement}
          onOpen={showModal}
          deletePaieID={handleDelete}
        />
      </div>
    </>
  );
}
