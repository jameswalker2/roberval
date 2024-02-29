import { supabase } from "@/Config/SupabaseConfig.jsx";
import { NavBar } from "@/components/Navbar/NavBar.jsx";
import { Empty } from "antd";
import { FilePlus2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Paiement.scss";

export function Paiement() {
  const [studentsP, setStudentsP] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectStudent] = useState(null);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const { data, error } = await supabase
          .from("paie")
          .select("*")
          .textSearch(search);

        if (error) {
          console.log(error.message);
        } else {
          setStudentsP(data);
          setClasses([...new Set(data.map((student) => student.classe))]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    return () => getStudents();
  }, [search]);

  const collectionOptions = classes.map((category) => ({
    value: category,
    label: category,
  }));

  const filterStudents = selectedCategory
    ? studentsP.filter((student) => student.classe === selectedCategory)
    : studentsP;

  const handleDelete = async (paieId) => {
    try {
      const { error } = await supabase.from("paie").delete().eq("id", paieId);

      if (error) {
        console.error(error);
      } else {
        document.getElementById("my_modal_1").close();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const expenseChannel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "paie" },
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
            <input
              placeholder="Recherche par nom"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-96 border-primaryColor border-2 rounded-full bg-white
              focus:file-input-primaryColor"
              type="search"
            />
          </div>
        </div>

        <div className="overflow-y-hidden overflow-x-auto w-[95%] h-auto mt-10 rounded-lg bg-white p-4 shadow-sm">
          {filterStudents.length > 0 ? (
            <table className="table">
              <thead className="text-supportingColor1 text-sm bg-primaryColor bg-opacity-10">
                <tr>
                  <th>ID</th>
                  <th>Classe</th>
                  <th>Nom Complet</th>
                  <th>Date de création</th>
                  <th>Montant Avancée</th>
                  <th>Balance</th>
                  <th>Date</th>
                  <th>Versement</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              {filterStudents
                .filter((resultL) =>
                  resultL.firstName
                    .toLowerCase()
                    .includes(search.toLowerCase()),
                )
                .map((student) => (
                  <tbody key={student.id} className="scroll">
                    <tr>
                      <td>0{student.id}</td>
                      <td>{student.classe}</td>
                      <td>
                        {student.firstName} {student.lastName}
                      </td>
                      <td>{moment(student.created_at).format("DD/MM/YYYY")}</td>
                      <td>{student.amount}</td>
                      <td>{student.balance}</td>
                      <td>{student.date}</td>
                      <td>{student.versement}</td>
                      <td
                        style={{
                          color:
                            student.statut === "Non Payé"
                              ? "red"
                              : student.statut === "Avance"
                              ? "#ffa901"
                              : "green",
                          fontSize: "13px",
                          fontWeight: "700",
                        }}>
                        {student.statut}
                      </td>
                      <td>
                        <span>
                          <button
                            onClick={() => {
                              setSelectStudent(student);
                              document.getElementById("my_modal_1").showModal();
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
            <Empty description={"Aucune donnée disponible"} />
          )}
        </div>
        <dialog id="my_modal_1" className={"modal"}>
          <div className="modal-box bg-white w-full max-w-xl">
            {selectedStudent && (
              <div>
                <h2 className="text-center font-semibold uppercase">
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </h2>
                <p className="text-center">{selectedStudent.classe}</p>

                <NavLink
                  to={"/update-paie/" + selectedStudent.id}
                  className="btn bg-color2 hover:bg-color3 border-none text-white mx-20">
                  Ajouter Paiement
                </NavLink>
                <button
                  onClick={() => handleDelete(selectedStudent.id)}
                  className="btn bg-red-600 border-none text-white m-10 hover:bg-red-700">
                  Delete
                </button>
              </div>
            )}
            <button
              onClick={() => document.getElementById("my_modal_1").close()}
              type={"button"}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </div>
        </dialog>
      </div>
    </>
  );
}
