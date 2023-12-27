import {NavLink, useParams} from "react-router-dom";
import {BiArrowBack, BiSolidPencil} from "react-icons/bi";
import "./Eleves.scss";
import { FiSearch } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { supabase } from "../login/SupabaseConfig.jsx";
import { BsPersonFillAdd } from "react-icons/bs";

export function Eleves() {
  const {id} = useParams()
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
  
  const handleDelete = async () => {
    const {error} = await supabase.from("students").delete().eq("id", id)
    
    if (error) {
      console.log(error)
    }
  }
  
  return (
      <>
        <div className="container_link_el">
          <NavLink to={"/accueil"}>
            <BiArrowBack id="back"/>
          </NavLink>
          <div>
            <NavLink className="link_el" to={"/accueil"}>
              Dashboard{" "}
          </NavLink>
          <span id="span">|</span>
          <NavLink className="link_el" to={"/paiement"}>
            Paiement
          </NavLink>
        </div>
      </div>

      <div className="container">
        {/* <div className="container_class">
          <div className="class_items card card-compact w-80 p-10 h-36  shadow-xl">
            <h2>Effectifs Classe NS I</h2>
            <h1 className="font-semibold text-4xl">23</h1>
          </div>
          <div className="class_items">
            <h2>Classe NS II</h2>
            <h1>50</h1>
          </div>
          <div className="class_items">
            <h2>Classe NS IV</h2>
            <h1>12</h1>
          </div>
        </div> */}
        <div className="search_bar">
          <h2 className="font-bold text-color1 uppercase">Liste des élèves</h2>
          <FiSearch id="icon_search" />
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="input text-xl bg-white rounded-full h-9 w-[30rem] p-5 px-9"
            type="search"
            id="search_bar"
            placeholder="Cherchez avec le nom de l'étudiant..."
          />
          <NavLink id="button_add_el" to={"/inscription"}>
            <BsPersonFillAdd id="btn_add_el" /> ajouter un nouvel élève
          </NavLink>
        </div>
        <div className="overflow-x-auto rounded-xl w-full h-[38rem] bg-white">
          {allResults.length > 0 ? (
              <table className="table table-xs">
                <thead
                    key="thead"
                    id="thead"
                    className="text-[16px] text-white bg-color2">
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
                {allResults
                    .filter(
                        (result) =>
                            result.firstName
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                            result.lastName
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                    )
                    .map((student) => (
                        <tbody key={student.student_id} className="text-2xl">
                        <tr>
                          <td>0{student.id}</td>
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
                          <BiSolidPencil/>
                        </NavLink>
                        <FaRegTrashAlt
                            onClick={handleDelete}
                        />
                      </span>
                          </td>
                        </tr>
                        </tbody>
                    ))}
              </table>) : (
              <p className="text-2xl flex justify-center mt-40">Aucune donnée trouvé</p>
          )}
        </div>
      </div>
    </>
  );
}
