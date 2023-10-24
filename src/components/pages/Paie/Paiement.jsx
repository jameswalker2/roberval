import {NavLink} from "react-router-dom";
import {db} from "../../login/FirebaseConfig.jsx";
import { useState, useEffect } from "react";
import {collection, onSnapshot} from "firebase/firestore";
import {NavBar} from "../../header/NavBar.jsx";
import {FiSearch} from "react-icons/fi";
import {FiMoreHorizontal} from 'react-icons/fi'
import {motion} from "framer-motion";
import './Paiement.scss'

// const classeSelect = {
// <option value="0">Classe</option>
// <option value='1e Année Kind'> 1e Année Kind</option>
// <option value='2e Année Kind'> 2e Année Kind</option>
// <option value='3e Année Kind'> 3e Année Kind</option>
// <option value='1e Année Fond'> 1e Année Fond</option>
// <option value='2e Année Fond'> 2e Année Fond</option>
// <option value='3e Année Fond'> 3e Année Fond</option>
// <option value='7e Année Fond'> 7e Année Fond</option>
// <option value='8e Année Fond'> 8e Année Fond</option>
// <option value='9e Année Fond'> 9e Année Fond</option>
// <option value='NS I<'> NS I</option>
// <option value='NS II'> NS II</option>
// <option value='NS III'> NS III</option>
// <option value='NS IV'> NS IV</option>
// }
//

export function Paiement() {
	
	const studentPaiementRef = collection(db, 'classes')
	const [studentsP, setStudentsP] = useState([])
	const [select, setSelect] = useState('')
	// console.log(test)



	useEffect(() => {
		const getStudentsPaie = onSnapshot(studentPaiementRef, snapshot => {
			setStudentsP(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
		})
		return () => {
			getStudentsPaie()
		}
	}, [studentPaiementRef])
	
	console.log(select)
	
	
	
	return (
		<>
			<NavBar/>
				<div className="container_link_paie">
					<h1 id="container_h1">Paiement</h1>
					<div>
						<NavLink className="link_paie"  to={'/accueil'}>Dashboard</NavLink>
						<span>|</span>
						<NavLink className="link_paie"  to={'/eleves'}>Eleves</NavLink>
					</div>
				</div>
			<motion.div
				initial={{opacity: 0, scaleY: 0, transformOrigin: "center"}}
				animate={{opacity: 1, scaleY: 1, transformOrigin: "bottom"}}
				exit={{opacity: 0, scaleY: 0}}
				transition={{duration: 0.5, easeinout: [0.22, 1, 0.36, 1]}}
			>
			
			<div className="container_all">
				<div className="container_search">
					<h2 style={{color: '#5800ff'}}>Selectionner les critères</h2>
					<select
						id="classe"
						name="classe"
						onChange={e => setSelect(e.target.value)}
					>
						<option>Classe</option>
						{
							studentsP.map((student) => (
								<option value={student.data.classe}  key={student.id}>
									{student.data.name}
								</option>
							))
						}
					</select>
					<select id="versement" name="versement">
						<option value='0'>Versement</option>
						<option value='versement 1'> Versement 1</option>
						<option value='versement 2'> Versement 2</option>
						<option value='versement 3'> Versement 3</option>
						<option value='versement 4'> Versement 4</option>
					</select>
					<FiSearch id="icn_search"/>
					<input id="search" type="search" placeholder="Entrez le nom..." autoFocus required/>
					<button type="submit">
						<FiSearch id="button_icn"/> Cherchez
					</button>
					{/*<h3>Total <span>$10,000 </span></h3>*/}
				</div>
				
				<div className="table_search_paiement">
					<table className="table_paiement">
						<thead key='thead'>
						<tr>
							<th>ID</th>
							<th>Classe</th>
							<th className="expand_bar">Nom Complet</th>
							<th className="expand_bar_2" >Valeur Avancée</th>
							<th className="expand_bar_2" >Balance</th>
							<th className="expand_bar_2" >Statut</th>
							<th className="expand_bar_2" >Action</th>
						</tr>
						</thead>
						{/*{studentsP.map((student) =>*/}
							<tbody key='tbody' className="scroll">
							<tr>
								<td></td>
								<td>NS III</td>
								<td className="expand_bar">Méat Wood Bert James</td>
								<td>$2000</td>
								<td>$4000</td>
								<td id="non" style={{color: 'red', fontWeight: '700', textTransform: 'uppercase'}}>Non Payé</td>
								<td>
                      <span className="actions">
                        <NavLink to="test" id="nav">
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
			</motion.div>
		</>
	)
}