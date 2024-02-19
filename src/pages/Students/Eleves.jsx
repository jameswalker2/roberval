import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BiSolidPencil } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { supabase } from "../../Config/SupabaseConfig.jsx";
import { NavBar } from "../../components/Navbar/NavBar.jsx";
import "./Eleves.scss";

const studentsPerPage = 15;
export function Eleves() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClasse, setSelectedClasse] = useState(false);
  const [classe, setClasse] = useState([]);

  const fetchAllResults = async () => {
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .textSearch(searchQuery);

      if (data) {
        setAllResults(data);
        setClasse([...new Set(data.map((student) => student.classe))]);
      } else {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllResults(currentPage);
  }, [currentPage, searchQuery]);

  const handleDelete = async (studentId) => {
    try {
      const { error } = await supabase
        .from("students")
        .delete()
        .eq("id", studentId);

      if (error) {
        console.error(error);
      } else {
        setAllResults((prevResults) =>
          prevResults.filter((student) => student.id !== studentId),
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const collectionOptions = classe.map((category) => ({
    value: category,
    label: category,
  }));

  const filterStudents = selectedClasse
    ? allResults.filter((student) => student.classe === selectedClasse)
    : allResults;
  const formatDate = (date) => new Date(date).toDateString();

  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const paginatedStudents = allResults
    .filter(
      (result) =>
        result.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.lastName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice(startIndex, endIndex);

  return (
    <>
      <NavBar />
      <Toaster />
      <div className="h-screen pl-64 py-5 bg-primaryColor bg-opacity-10">
        <div className="text-sm breadcrumbs flex items-center justify-between w-[95%] h-16 p-4 text-supportingColor1 bg-white rounded-lg shadow-sm">
          <h1 className="font-semibold text-2xl">Eleves</h1>
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
          </ul>
        </div>

        <div className=" w-[95%] p-4 rounded-lg bg-white mb-5 mt-10">
          <h2 className="font-medium mb-5 text-supportingColor1 ">
            Selectionner les critères
          </h2>
          <div className="flex items-center justify-center">
            <select
              onChange={(e) => setSelectedClasse(e.target.value)}
              className="select select-bordered w-full max-w-xs mr-20 bg-primaryColor text-white">
              <option value="" className="text-gray-300">
                Recherche par classe
              </option>
              {collectionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              value={searchQuery}
              className="input input-bordered bg-white rounded-full h-9 w-[30rem] "
              type="search"
              id="search_bar"
              placeholder="Cherchez avec le nom ou prénom de l'étudiant..."
            />
            <NavLink
              className="flex justify-center items-center bg-color2 rounded-full text-red-600 w-20 h-8"
              to={"/inscription"}>
              Ajouter
            </NavLink>
          </div>
        </div>

        <div className="overflow-x-auto w-full h-[32rem] rounded-2xl bg-white p-5 ">
          <h2 className="font-semibold text-color1 mb-1">Liste des élèves</h2>
          {allResults.length > 0 ? (
            <div>
              <table className="table table-xs">
                <thead
                  key="thead"
                  className="text-color2 text-sm bg-gray-50 hover:bg-gray-100">
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Date de naissance</th>
                    <th>Lieu de naissance</th>
                    <th>Sexe</th>
                    <th>classe</th>
                    <th>Adresse</th>
                    <th>Téléphone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {paginatedStudents
                  .filter(
                    (result) =>
                      result.firstName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      result.lastName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                  )
                  .map((student) => (
                    <tbody key={student.id} className="text-2xl font-semibold">
                      <tr>
                        <td>0{student.id}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{formatDate(student.birth)}</td>
                        <td>{student.adressBirth}</td>
                        <td>{student.gender}</td>
                        <td>{student.classe}</td>
                        <td>{student.adress}</td>
                        <td>{student.phone}</td>
                        <td>
                          <span className="actions">
                            <NavLink id="nav" to={"/edit/" + student.id}>
                              <BiSolidPencil />
                            </NavLink>
                            <FaRegTrashAlt
                              onClick={() => handleDelete(student.id)}
                            />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
              <Pagination
                current={currentPage}
                pageSize={studentsPerPage}
                total={filterStudents.length}
                onChange={(page) => setCurrentPage(page)}
                className="text-center"
              />
            </div>
          ) : (
            <p className="text-2xl flex justify-center mt-40">
              Aucune donnée trouvé
            </p>
          )}
        </div>
      </div>
    </>
  );
}
