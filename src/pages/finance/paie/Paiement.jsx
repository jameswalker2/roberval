import moment from "moment/moment.js";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { supabase } from "../../../Config/SupabaseConfig.jsx";
import { NavBar } from "../../../components/Navbar/NavBar.jsx";
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
        // eslint-disable-next-line no-unused-vars
        const { data, error } = await supabase
          .from("paie")
          .select("*")
          .textSearch(search);

        if (data) {
          setStudentsP(data);
          setClasses([...new Set(data.map((student) => student.classe))]);
        } else {
          console.log(error.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStudents();
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
      toast.error(error.message);
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
      <div className="h-[100vh]">
        <div
          className="relative w-[75rem] h-[7vh]  bg-white top-10 left-[16%] rounded-full pl-5 pr-20 flex items-center
        justify-between mb-[80px] ">
          <h1 className="text-xl text-color1 font-semibold">Paiement</h1>
          <div>
            <NavLink
              className="text-color2 hover:text-color1"
              to={"/dashboard"}>
              Dashboard
            </NavLink>
            <span className="m-5" id="span">
              |
            </span>
            <NavLink className="text-color2 hover:text-color1" to={"/eleves"}>
              Eleves
            </NavLink>
          </div>
        </div>
        <div className="flex justify-around items-center ml-[16%] bg-white w-[75rem] h-20 rounded-2xl">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered focus:select-primary bg-gray-200 w-full max-w-xs">
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
            className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs"
            type="search"
          />
          <NavLink
            className="btn bg-color2 text-white border-none hover:bg-color3"
            to={"/addpaie"}>
            + Générer un paiement
          </NavLink>
          {/*<h3>Total <span>$10,000 </span></h3>*/}
        </div>
        <div className="overflow-x-auto mt-10 bg-white h-[26rem] rounded-2xl ml-[16%] w-[75rem]">
          {filterStudents > 0 ? (
            <table className="table">
              <thead className="text-color1">
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
            <p className="text-2xl flex justify-center mt-40">
              Aucune paiement générée pour le moment
            </p>
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
