import { NavLink } from "react-router-dom";
import { BiArrowBack, BiSolidPencil } from "react-icons/bi";
import "./Eleves.scss";
import { FiSearch } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { supabase } from "../login/SupabaseConfig.jsx";
import { BsPersonFillAdd } from "react-icons/bs";

export function Eleves() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allResults, setAllResults] = useState([]);

  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        const { data, error } = await supabase
          .from("students")
          .select("*")
          .textSearch(searchQuery);

        if (data) {
          setAllResults(data);
        } else {
          console.log(error.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAllResults();
  }, [searchQuery]);

  return (
    <>
      <div className="container_link_el">
        <NavLink to={"/accueil"}>
          <BiArrowBack id="back" />
        </NavLink>
        <div>
          <NavLink className="link_el" to={"/accueil"}>
            Dashboard{" "}
          </NavLink>
          <span>|</span>
          <NavLink className="link_el" to={"/paiement"}>
            Paiement
          </NavLink>
        </div>
      </div>
      <div className="container_class">
        <div className="class_items">
          <h2>Classe NS I</h2>
          <h1>23</h1>
        </div>
        <div className="class_items">
          <h2>Classe NS II</h2>
          <h1>50</h1>
        </div>
        <div className="class_items">
          <h2>Classe NS IV</h2>
          <h1>12</h1>
        </div>
      </div>
      <div className="container">
        <div className="search_bar">
          <h2 style={{ color: "#4d00e4", margin: "0px 0" }}>
            Liste des élèves
          </h2>
          <FiSearch id="icon_search" />
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            type="search"
            id="search_bar"
            placeholder="Cherchez un élève..."
          />
          <NavLink id="button_add_el" to={"/inscription"}>
            <BsPersonFillAdd id="btn_add_el" /> Ajouter
          </NavLink>
        </div>
        <div>
          <table className="table_el">
            <thead key="thead">
              <tr>
                <th>Nom</th>
                <th className="expand_el">Prénom</th>
                <th className="expand_el">Date de naissance</th>
                <th className="expand_el">Lieu de naissance</th>
                <th>Sexe</th>
                <th className="expand_el">classe</th>
                <th>Adresse</th>
                <th>Téléphone</th>
                <th>Actions</th>
              </tr>
            </thead>
            {allResults
              .filter((result) =>
                result.firstName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((student) => (
                <tbody key={student.id} className="scroll">
                  <tr>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.birth}</td>
                    <td>{student.adressBirth}</td>
                    <td>{student.gender}</td>
                    <td>{student.classe}</td>
                    <td>{student.adress}</td>
                    <td>{student.phone}</td>
                    <td>
                      <span className="actions">
                        <NavLink
                          id="nav"
                          // to={`/edit/${student.id}`
                          to={`/edit/`}>
                          <BiSolidPencil />
                        </NavLink>
                        <FaRegTrashAlt
                        // onClick={() => handleDelete(student.id)}
                        />
                      </span>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </>
  );
}
