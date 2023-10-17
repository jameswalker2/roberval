import {NavLink} from "react-router-dom";
import {db} from "../login/FirebaseConfig.jsx";
import { useState, useEffect } from "react";
import {collection, onSnapshot} from "firebase/firestore";
import {NavBar} from "../header/NavBar.jsx";
import {FiSearch} from "react-icons/fi";
import {FiMoreHorizontal} from 'react-icons/fi'
import './Payment.scss'

export function Paiement() {
    
    const studentPaiementRef = collection(db, 'inscription')
    const [studentsP, setStudentsP] = useState([])
    
    
    
    useEffect(() => {
        const getStudentsPaie = onSnapshot(studentPaiementRef, snapshot => {
            setStudentsP(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        })
        return () => {
            getStudentsPaie()
        }
    }, [studentPaiementRef])
    
    
    
 

    return (
    <>
        <NavBar/>
        <div className="container_all">
            <h1 id="container_h1">Paiement</h1>
            <div className="container_search">
                <select id="classe" name="classe">
                    <option value="0">Classe</option>
                    <option value='1e Année Kind'> 1e Année Kind</option>
                    <option value='2e Année Kind'> 2e Année Kind</option>
                    <option value='3e Année Kind'> 3e Année Kind</option>
                    <option value='1e Année Fond'> 1e Année Fond</option>
                    <option value='2e Année Fond'> 2e Année Fond</option>
                    <option value='3e Année Fond'> 3e Année Fond</option>
                    <option value='7e Année Fond'> 7e Année Fond</option>
                    <option value='8e Année Fond'> 8e Année Fond</option>
                    <option value='9e Année Fond'> 9e Année Fond</option>
                    <option value='NS I<'> NS I</option>
                    <option value='NS II'> NS II</option>
                    <option value='NS III'> NS III</option>
                    <option value='NS IV'> NS IV</option>
                </select>
                <select id="versement" name="versement">
                    <option value='0'>Versement</option>
                    <option value='versement 1'> Versement 1</option>
                    <option value='versement 2'> Versement 2</option>
                    <option value='versement 3'> Versement 3</option>
                    <option value='versement 4'> Versement 4</option>
                </select>
                <input
                  type="search"
                  id="sr_bar"
                  placeholder="Cherchez..."/>
                <FiSearch id="ic_sc"/>
            </div>

            <div className="table_search_paiement">
                <table className="table_paiement">
                    <thead key='thead'>
                    <tr>
                        <th>ID</th>
                        <th>Classe</th>
                        <th className="expand_bar">Nom Complet</th>
                        <th className="expand_bar">Valeur Avancée</th>
                        <th className="expand_bar">Balance</th>
                        <th className="expand_bar">Statut</th>
                        <th className="expand_bar">Action</th>
                    </tr>
                    </thead>
                    {studentsP.map((student) =>
                      <tbody key={student.id} className="scroll">
                      <tr>
                          <td>{student.data.key}</td>
                          <td>{student.data.classe}</td>
                          <td>{student.data.nom} {student.data.prenom}</td>
                          <td>{}</td>
                          <td>$4000</td>
                          <td id="non">{student.data.statut}</td>
                          <td>
                      <span className="actions">
                        <NavLink id="nav">
                            <FiMoreHorizontal/>
                        </NavLink>
                      </span>
                          </td>
                      </tr>
                      </tbody>
                    )}
                </table>
            </div>
        </div>
    </>
    )
}