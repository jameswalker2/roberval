import { Modal } from "antd";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { supabase } from "../Config/SupabaseConfig.jsx";
import "./AddPaie.scss";
import { NavBar } from "./Navbar/NavBar.jsx";

export function GeneratedPaiement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [balanceStudent, setBalanceStudent] = useState(null);
  const [amount, setAmount] = useState("");
  const [bourse, setBourse] = useState("");
  const [balance, setBalance] = useState("");
  const [statut, setStatut] = useState("");

  const handleSearch = async () => {
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .textSearch("firstName", searchQuery);

      if (error) {
        throw error;
      } else {
        const formattedData = data.map((student) => ({
          ...student,
          selected: false,
        }));
        setSearchResults(formattedData);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleSelectStudentID = (studentId) => {
    const updatedStudents = searchResults.map((student) => {
      if (student.id === studentId) {
        return { ...student, selected: !student.selected };
      }
      return { ...student, selected: false };
    });
    setSearchResults(updatedStudents);
    setSelectedStudent(studentId);
  };

  const toggleSelectStudentClasse = (studentClasse) => {
    const updatedStudents = searchResults.map((student) => {
      if (student.id === studentClasse) {
        return { ...student, selected: !student.selected };
      }
      return { ...student, selected: false };
    });
    setSearchResults(updatedStudents);
    setSelectedStudent(studentClasse);
    setBalanceStudent(studentClasse);
  };
  const handleCollectFees = async (e) => {
    e.preventDefault();
    const selectedStudentObj = searchResults.find(
      (student) => student.id === selectedStudent,
    );

    try {
      const { students_id } = selectedStudentObj;
      const { error: error1 } = await supabase
        .from("generated_paiement")
        .insert([
          {
            amount,
            bourse,
            balance: balance,
            statut,
            student_id: students_id,
          },
        ]);

      if (error1) {
        throw error1;
      }

      const { error: error2 } = await supabase.from("history_paiement").insert([
        {
          amount,
          bourse,
          balance: balance,
          statut,
          generated_id: students_id,
        },
      ]);

      if (error2) {
        throw error2;
      }

      setSearchResults([]);
      Modal.success({
        title: "Succès !",
        content: "Paiement généré avec succès !",
        okButtonProps: { type: "default" },
      });
      setSearchQuery("");
      setBalance("");
      setAmount("");
      setBourse("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    calculateBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, bourse, balanceStudent]);

  const calculateBalance = () => {
    if (!balanceStudent) return;

    let getAmount = 0;

    switch (balanceStudent) {
      case "1e Annee Kind":
      case "2e Annee Kind":
      case "3e Annee Kind":
        getAmount = 6500;
        break;
      case "1e Annee Fond":
      case "2e Annee Fond":
      case "3e Annee Fond":
        getAmount = 4500;
        break;
      case "4e Annee Fond":
      case "5e Annee Fond":
      case "6e Annee Fond":
        getAmount = 5000;
        break;
      case "7e Annee Fond":
      case "8e Annee Fond":
        getAmount = 6500;
        break;
      case "9e Annee Fond":
        getAmount = 7000;
        break;
      case "NS I":
        getAmount = 8000;
        break;
      case "NS II":
      case "NS III":
        getAmount = 8500;
        break;
      case "NS IV":
        getAmount = 10000;
        break;
      default:
        getAmount = 0;
        break;
    }

    let reduceBalance = getAmount - amount;
    let ifBourse = reduceBalance - bourse;
    setBalance(ifBourse);
  };

  return (
    <>
      <NavBar />
      <div className="h-screen overflow-scroll pl-64 py-5 bg-primaryColor bg-opacity-10">
        <div className="text-sm breadcrumbs flex items-center justify-between w-[95%] h-16 p-4 text-supportingColor1 bg-white rounded-lg shadow-sm">
          <NavLink to={"/paiement"}>
            <BiArrowBack className="h-8 w-8 p-1 text-primaryColor hover:bg-slate-100 rounded-full" />
          </NavLink>
          <ul>
            <li>
              <NavLink className="text-supportingColor1" to={"/dashboard"}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className="text-supportingColor1" to={"/paiement"}>
                Paiement
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-supportingColor1"
                to={"/GeneratedPaiement"}>
                Ajouter un paiement
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <div className="mb-5">
            <h2>Selectionner les critères</h2>
          </div>
          <div className="flex flex-wrap justify-center">
            <input
              type="text"
              className="input w-96 bg-slate-100 border-primaryColor border-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher avec le prénom de l'étudiant..."
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
                <thead className="text-supportingColor1 text-sm bg-primaryColor bg-opacity-10">
                  <tr>
                    <th>ID</th>
                    <th>Classe</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Mère</th>
                    <th>Père</th>
                    <th>Phone</th>
                    <th></th>
                  </tr>
                </thead>
                {searchResults.map((student) => (
                  <tbody key={student.students_id}>
                    <tr>
                      <td>{student.id}</td>
                      <td>{student.classe}</td>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.lastMother}</td>
                      <td>{student.lastFather}</td>
                      <td>{student.phone}</td>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox border-2 border-primaryColor"
                          checked={student.selected}
                          onChange={() => {
                            toggleSelectStudentClasse(student.classe);
                            toggleSelectStudentID(student.id);
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

        {searchResults.some((student) => student.selected) && (
          <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
            <h2 className="font-medium">Information pour générer</h2>
            <form onSubmit={handleCollectFees}>
              <div className="flex flex-wrap items-center p-10">
                <label className="form-control w-full max-w-xs mr-5 mb-2">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      Montant Annuel
                    </span>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => {
                      calculateBalance();
                      setAmount(e.target.value);
                    }}
                    placeholder="Montant Annuel"
                    className="input bg-slate-100 border-primaryColor border-2"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-5 mb-2">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      Bourse
                    </span>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => {
                      calculateBalance();
                      setBourse(e.target.value);
                    }}
                    placeholder="Montant Annuel"
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
                    placeholder={balance}
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
                    <option value="0" className="text-gray-400">
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
                <div className="ml-[%]">
                  <button
                    className="btn bg-primaryColor text-white border-none 
                  hover:bg-slate-100 hover:text-primaryColor font-normal"
                    type="submit">
                    Générer le paiement
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
