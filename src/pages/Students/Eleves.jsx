import { Empty, Pagination } from "antd";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, UserPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../../Config/SupabaseConfig.jsx";
import { NavBar } from "../../components/Navbar/NavBar.jsx";
import "./Eleves.scss";

const studentsPerPage = 20;

export function Eleves() {
  const tableRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClasse, setSelectedClasse] = useState(false);
  const [classe, setClasse] = useState([]);

  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        const { data, error } = await supabase
          .from("students")
          .select("*")
          .textSearch(searchQuery);

        if (data) {
          setAllResults(data);
          const sortedClasse = [
            "PRESCOLAIRE 1",
            "PRESCOLAIRE 2",
            "PRESCOLAIRE 3",
            "1 AF",
            "2 AF",
            "3 AF",
            "4 AF",
            "5 AF",
            "6 AF",
            "7 AF",
            "8 AF",
            "9 AF",
            "NS I",
            "NS II",
            "NS III",
            "NS IV",
          ];

          const kindYears = sortedClasse.filter((classe) =>
            classe.includes("PRESCOLAIRE"),
          );
          const fondYears = sortedClasse.filter((classe) =>
            classe.includes("AF"),
          );
          const nsYears = sortedClasse.filter((classe) =>
            classe.includes("NS"),
          );

          const sortedClasseCombined = [...kindYears, ...fondYears, ...nsYears];

          setClasse(sortedClasseCombined);
        } else {
          console.log(error.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

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
      console.log(error.message);
    }
  };

  const collectionOptionsSorted = classe.map((category) => ({
    value: category,
    label: category,
  }));

  const filterStudents = selectedClasse
    ? allResults.filter((student) => student.classe === selectedClasse)
    : allResults;

  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const paginatedStudents = filterStudents
    .filter(
      (result) =>
        result.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.lastName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice(startIndex, endIndex);

  const generatePDF = () => {
    const input = tableRef.current;
    html2canvas(input, {
      useCORS: true,
      scale: 2,
      backgroundColor: null,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "pt", "a4");
        const imgWidth = 595.28;
        const pageHeight = 841.89;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("students.pdf");
      })
      .catch((err) => {
        console.error("Error generating PDF:", err);
      });
  };

  return (
    <>
      <NavBar />
      <div className="h-screen overflow-scroll pl-64 py-5 bg-primaryColor bg-opacity-10">
        <div
          className="text-sm breadcrumbs flex items-center justify-between w-[95%] h-16 p-4 text-supportingColor1 
        bg-white rounded-lg shadow-sm">
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

        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-medium  text-supportingColor1 ">
              Selectionner les critères
            </h2>
            <NavLink
              className="btn font-normal bg-primaryColor border-none text-white hover:text-primaryColor hover:bg-slate-100"
              to={"/inscription"}>
              <UserPlus />
              Nouveau Eleves
            </NavLink>
          </div>
          <div className="flex justify-center items-center ">
            <select
              onChange={(e) => setSelectedClasse(e.target.value)}
              className="select w-full max-w-xs mr-20 bg-white border-primaryColor border-2 text-supportingColor1">
              <option value="" className="text-gray-300">
                Recherche par classe
              </option>
              {collectionOptionsSorted.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="input input-bordered bg-white border-primaryColor border-2 rounded-lg w-[30rem]"
              type="search"
              placeholder="Rechercher avec le nom ou prénom de l'étudiant"
            />
          </div>
        </div>

        <div className="overflow-y-hidden overflow-x-auto w-[95%] h-auto mt-10 rounded-lg bg-white p-4 shadow-sm ">
          <div className="mb-5">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-supportingColor1">
                Liste des élèves
                <div>
                  <p className="text-primaryColor font-semibold ">
                    Total:{" "}
                    <span className="font-medium">{filterStudents.length}</span>
                  </p>
                </div>
              </h2>
              <div>
                <button
                  onClick={generatePDF}
                  className="btn font-normal bg-primaryColor border-none text-white hover:text-primaryColor hover:bg-slate-100">
                  <Download strokeWidth={1.45} />
                  Exporter au format PDF
                </button>
              </div>
            </div>
          </div>
          {paginatedStudents.length > 0 ? (
            <div ref={tableRef}>
              <table
                ref={tableRef}
                id="table-to-pdf"
                className="table table-xs md:table-fixed	"
                style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead
                  key="thead"
                  className="text-supportingColor1 text-sm bg-primaryColor bg-opacity-10 ">
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Date naissance</th>
                    <th>Sexe</th>
                    <th>classe</th>
                    <th>Adresse</th>
                    <th>Téléphone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {paginatedStudents.map((student) => (
                  <tbody
                    key={student.id}
                    className="text-supportingColor1 font-semibold">
                    <tr>
                      <td className="font-bold">0{student.id}</td>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{dayjs(student.birth).format("DD MMMM YYYY")}</td>
                      <td>{student.gender}</td>
                      <td>{student.classe}</td>
                      <td>{student.address}</td>
                      <td>{student.phone}</td>
                      <td>
                        <span className="actions">
                          <div className="dropdown dropdown-end">
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-xs text-xs h-10 w-20 border-none text-white bg-primaryColor
																hover:bg-slate-100 hover:text-primaryColor active:bg-slate-100">
                              Détails
                            </div>
                            <ul className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-32">
                              <li className="text-supportingColor4 hover:bg-slate-100 rounded-box">
                                <NavLink to={"/edit/" + student.id}>
                                  Modifier
                                </NavLink>
                              </li>
                              <li className="text-red-600 hover:bg-slate-100 rounded-box cursor-pointer">
                                <button
                                  onClick={() => handleDelete(student.id)}>
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
                pageSize={studentsPerPage}
                total={filterStudents.length}
                onChange={(page) => setCurrentPage(page)}
                className="text-center mt-10"
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
