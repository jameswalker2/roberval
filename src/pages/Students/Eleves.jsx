import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BiArrowBack, BiSolidPencil } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { supabase } from "../../Config/SupabaseConfig.jsx";
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
      <div className="h-[115vh]">
        <div className="container absolute left-[50%] h-[100vh] top-10 translate-x-[-50%]">
          <div className="flex items-center justify-between h-11 mb-10 bg-white px-10 rounded-full">
            <NavLink className="text-2xl text-color1" to={"/dashboard"}>
              <BiArrowBack />
            </NavLink>
            <div>
              <NavLink
                className="font-medium text-color2 hover:text-color1"
                to={"/dashboard"}>
                Dashboard
              </NavLink>
              <span className="m-5">|</span>
              <NavLink
                className="font-medium text-color2 hover:text-color1"
                to={"/paiement"}>
                Paiement
              </NavLink>
            </div>
          </div>
          <Toaster />
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white mb-5">
            {/*<h2 className="font-medium text-color1 ">Liste des élèves</h2>*/}
            <select
              onChange={(e) => setSelectedClasse(e.target.value)}
              className="select select-bordered focus:select-primary bg-gray-200 w-full max-w-xs">
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
              className="flex justify-center items-center bg-color2 rounded-full text-white w-20 h-8"
              to={"/inscription"}>
              Ajouter
            </NavLink>
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
                      <tbody
                        key={student.id}
                        className="text-2xl font-semibold">
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
      </div>
    </>
  );
}
