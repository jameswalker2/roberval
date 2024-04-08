import { supabase } from "@/Config/SupabaseConfig.jsx";
import { NavBar } from "@/components/Navbar/NavBar.jsx";
import { Empty, Modal, Pagination } from "antd";
import { FilePlus2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ModalPaie from "./ModalPaie";
import "./Paiement.scss";

const paiementPerPage = 20;
export function Paiement() {
  const [studentsP, setStudentsP] = useState([]);
  const [classes, setClasses] = useState([]);
  const [paiement, setPaiement] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPaiement, setSelectedPaiement] = useState(null);
  const [selectedPaie, setSelectedPaie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
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
          const sortedStatut = ["Non payé", "Avance", "Payé"];
          setPaiement(sortedStatut);
          const sortedClasse = [
            "1e Annee Kind",
            "2e Annee Kind",
            "3e Annee Kind",
            "1e Annee Fond",
            "2e Annee Fond",
            "3e Annee Fond",
            "4e Annee Fond",
            "5e Annee Fond",
            "6e Annee Fond",
            "7e Annee Fond",
            "8e Annee Fond",
            "9e Annee Fond",
            "NS I",
            "NS II",
            "NS III",
            "NS IV",
          ];

          const kindYears = sortedClasse.filter((classe) =>
            classe.includes("Kind"),
          );
          const fondYears = sortedClasse.filter((classe) =>
            classe.includes("Fond"),
          );
          const nsYears = sortedClasse.filter((classe) =>
            classe.includes("NS"),
          );

          const sortedClasseCombined = [...kindYears, ...fondYears, ...nsYears];

          setClasses(sortedClasseCombined);
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

  const collectionOptionsClasse = classes.map((category) => ({
    value: category,
    label: category,
  }));

  const collectionOptionsPaie = paiement.map((category) => ({
    value: category,
    label: category,
  }));

  const filterPaieByCriteria = (students, selectedCategory, selectedPaie) => {
    return students.filter((student) => {
      const meetsCategoryCriteria =
        !selectedCategory || student.students.classe === selectedCategory;
      const meetsPaiementCriteria =
        !selectedPaie || student.statut === selectedPaie;
      return meetsCategoryCriteria && meetsPaiementCriteria;
    });
  };

  const startIndex = (currentPage - 1) * paiementPerPage;
  const endIndex = startIndex + paiementPerPage;
  const filterPaie = filterPaieByCriteria(
    studentsP,
    selectedCategory,
    selectedPaie,
  );
  const paginatedPaie = filterPaie.slice(startIndex, endIndex);

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
              className="select bg-white border-primaryColor border-2  w-full max-w-xs focus:select-primary">
              <option value="" className="p-20 m-20 text-gray-300">
                Recherche par classe
              </option>

              {collectionOptionsClasse.map((option) => (
                <option
                  className="text-black"
                  key={option.value}
                  value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setSelectedPaie(e.target.value)}
              className="select bg-white border-primaryColor border-2  w-full max-w-xs focus:select-primary ">
              <option value="" className="text-gray-300">
                Recherche par paiement
              </option>

              {collectionOptionsPaie.map((option) => (
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
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="input input-bordered w-96 border-primaryColor border-2 rounded-lg bg-white
              focus:file-input-primaryColor"
              type="search"
            />
          </div>
        </div>
        <div className="overflow-y-hidden overflow-x-auto w-[95%] h-auto mt-10 rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-5">
            <h2 className=" font-medium">Liste paiement générer</h2>
            <p className="text-primaryColor text-sm">
              Total de{" "}
              <span className="font-semibold">{filterPaie.length}</span> sur{" "}
              <span className="font-semibold">{studentsP.length}</span> lignes
            </p>
          </div>
          {paginatedPaie.length > 0 ? (
            <div>
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
                {paginatedPaie
                  .filter(
                    (result) =>
                      result.students.firstName
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      result.students.lastName
                        .toLowerCase()
                        .includes(search.toLowerCase()),
                  )
                  .map((student) => (
                    <tbody key={student.student_id} className="scroll">
                      <tr>
                        <td>0{student.students.id}</td>
                        <td>{student.students.classe}</td>
                        <td>
                          {student.students.firstName}{" "}
                          {student.students.lastName}
                        </td>
                        <td>
                          {moment(student.created_at).format("DD/MM/YYYY")}
                        </td>
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
              <Pagination
                current={currentPage}
                pageSize={paiementPerPage}
                total={filterPaie.length}
                onChange={(page) => setCurrentPage(page)}
                className="text-center mt-10"
              />
            </div>
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
