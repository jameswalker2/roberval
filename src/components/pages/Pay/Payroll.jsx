import {NavLink} from "react-router-dom";
import {db} from "../../login/FirebaseConfig.jsx";
import { useState, useEffect } from "react";
import {collection, onSnapshot} from "firebase/firestore";
import {NavBar} from "../../header/NavBar.jsx";
import {FiSearch} from "react-icons/fi";
import {FiMoreHorizontal} from 'react-icons/fi'
import './Payroll.scss'

export function Payroll() {
    
    // const studentPaiementRef = collection(db, 'inscription')
    // const [studentsP, setStudentsP] = useState([])
    //
    //
    //
    // useEffect(() => {
    // 	const getStudentsPaie = onSnapshot(studentPaiementRef, snapshot => {
    // 		setStudentsP(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
    // 	})
    // 	return () => {
    // 		getStudentsPaie()
    // 	}
    // }, [studentPaiementRef])
    //
    //
    
    
    
    
    return (
      <>
          <NavBar/>
          <div className="container_all_pay">
              <div className="container_link">
                  <h1 id="container_h1">Payroll</h1>
                  <div>
                      <NavLink className="link"  to={'/accueil'}>Dashboard</NavLink>
                      <span>|</span>
                      <NavLink className="link"  to={'/staffs'}>Staffs</NavLink>
                  </div>
              </div>
              <div className="container_search_pay">
                  <h2 style={{color: '#5800ff'}}>Selectionner les critères</h2>
                  <select id="fonction" name="fonction">
                      <option value="0">Fonction</option>
                      <option value='Profs Kind'> Profs Kind</option>
                      <option value='Profs Fond'> Profs Fond</option>
                      <option value='Profs Sec'> Profs Sec</option>
                      <option value='Direction'> Direction </option>
                  </select>
                  <select id="mois" name="mois">
                      <option value='0'>Octobre</option>
                      <option value='Janvier'>Janvier</option>
                      <option value='Février'>Février</option>
                      <option value='Mars'>Mars</option>
                      <option value='Avril'>Avril</option>
                      <option value='Mai'>Mai</option>
                      <option value='Juin'>Juin</option>
                      <option value='Juillet'>Juillet</option>
                      <option value='Août'>Août</option>
                      <option value='Septembre'>Septembre</option>
                      <option value='Octobre'>Octobre</option>
                      <option value='Novembre'>Novembre</option>
                      <option value='Décembre'>Décembre</option>
                  </select>
                  <select id="year" name="year">
                      <option value='0'>2023</option>
                      <option value='2024'>2024</option>
                      <option value='2025'>2025</option>
                      <option value='2026'>2026</option>
                      <option value='2027'>2027</option>
                      <option value='2028'>2028</option>
                      <option value='2029'>2029</option>
                      <option value='2030'>2030</option>
                      <option value='2031'>2031</option>
                      <option value='2032'>2032</option>
                      <option value='2033'>2033</option>
                      <option value='2034'>2034</option>
                      <option value='2035'>2035</option>
                  </select>
                  <button id="button" type="submit">
                      <FiSearch id="button_icn_pay"/> Cherchez
                  </button>
                  {/*<h3>Total <span>$10,000 </span></h3>*/}
              </div>
              
              <div className="container_table_pay">
                  <table className="table_pay">
                      <thead id="thead" key='thead'>
                      <tr>
                          <th>CODE</th>
                          <th className="expand_bar" >Nom Complet</th>
                          <th className="expand_bar_2">Fonction</th>
                          <th className="expand_bar_2" >Téléphone</th>
                          <th  >Valeur Avancée</th>
                          <th  >Statut</th>
                          <th >Action</th>
                      </tr>
                      </thead>
                      {/*{studentsP.map((student) =>*/}
                      <tbody key='tbody' className="scroll">
                      <tr>
                          <td>PK06</td>
                          <td>Méat Wood Bert James</td>
                          <td>Profs Fond</td>
                          <td>3608-7475</td>
                          <td>$0</td>
                          <td id="non" style={{color: 'red', fontWeight: '700', textTransform: 'uppercase'}}>Non Payé</td>
                          <td>
                      <span className="actions_pay">
                        <NavLink id="nav">
                            <FiMoreHorizontal/>
                        </NavLink>
                      </span>
                          </td>
                      </tr>
                      </tbody>
                      {/*)}*/}
                  </table>
              </div>
          </div>
      </>
    )
}