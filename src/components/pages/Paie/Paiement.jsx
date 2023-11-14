import {NavLink} from "react-router-dom";
import {supabase} from "../../login/SupabaseConfig.jsx";
import {motion} from "framer-motion";
import {useState, useEffect} from "react";
import {NavBar} from "../../header/NavBar.jsx";
import {FiMoreHorizontal} from 'react-icons/fi'
import Select from "react-select";
import './Paiement.scss'


export function Paiement() {

	const [studentsP, setStudentsP] = useState([])
	const [classes, setClasses] = useState([])
	const [selectedCategory, setSelectedCategory] = useState(false)

	
	useEffect(() => {
		getStudents();
	}, []);
	const getStudents = async () => {
		try {
			// eslint-disable-next-line no-unused-vars
			const { data, error } = await supabase
				.from("students")
				.select('*');

			if (data) {
				setStudentsP(data);
				setClasses(
					[... new Set(data.map((student) => student.class))
					])
			}
		} catch (error) {
			console.log(error)
		}
	}

	
	const collectionOptions = classes.map((category) => ({
		value: category,
		label: category
	}))

	const filterStudents = selectedCategory ? studentsP.filter((student) => student.class === selectedCategory.value):studentsP

	const colorStyles = {
		control: (baseStyles, state) => ({
			...baseStyles,
			color: "#ffffffff",
			backgroundColor: state.isFocused && 'white',
			boxShadow: '0 0 5px 0 rgba(0,0,0,0.2)',
			border: "none",
			outline: '0',
			font: 'inherit',
			width: "25rem",
			maxWidth: '25rem',
			height: "2.8rem",
			padding: "0 20px",
			margin: "0 25px",
			fontSize: "19px",
			borderRadius: "10px"
		}),
		option: (styles, {data}) => {
			return {...styles,
				width: data.width ? '20rem' : '28rem',
				color: 'red'}
			}
			
		}
		

		
		
		
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
				transition={{duration: 0.5, easeinout: [0.22, 1, 0.36, 1]}}>
			
			<div className="container_all">
				<div className="container_search">
					<h2>Selectionner les critères</h2>
					<p>Chercher par classe ou par nom directement</p>
					<div id="form_search">
						<Select
							styles={colorStyles}
							options={collectionOptions}
							placeholder="Classe"
							onChange={(selectOption) =>setSelectedCategory(selectOption)}
							value={selectedCategory}
						/>
					<input id="search" type="search" placeholder="Entrez le nom..." autoFocus required/>
					<NavLink className='button' to={'/addPaie'}>
					+ Add a new
					</NavLink>
					</div>
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
							<th className="expand_bar_2">Versement</th>
							<th className="expand_bar_2" >Statut</th>
							<th className="expand_bar_2" >Action</th>
						</tr>
						</thead>
						{filterStudents.map((student) =>
							<tbody key={student.id}  className="scroll">
							<tr>
								<td>{student.id}</td>
								<td>{student.classe}</td>
								<td className="expand_bar">{student.firstName} {student.lastName}</td>
								<td>$2000</td>
								<td>$5000</td>
								<td>Versement 1</td>
								<td id="non" 
								style={{fontWeight: '700', textTransform: 'uppercase', color: 'red'}}>
									non-pay</td>
								<td>
									<span className="actions">
										<NavLink to="test" id="nav">
											<FiMoreHorizontal/>
										</NavLink>
									</span>
								</td>
							</tr>
							</tbody>
						)
						}
					</table>
				</div>
			</div>
			</motion.div>
		</>
	)
}