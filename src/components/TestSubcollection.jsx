import {db} from './login/FirebaseConfig.jsx'
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection, addDoc} from "firebase/firestore";
import {useState} from "react";

export function TestSubcollection() {
	const [nom, setNom] = useState('')
	const [classe, setClasse] = useState('')


	const cl001Ref = collection(db, "classes/cl001/students-001")

	const [docs] = useCollectionData(cl001Ref)

	function handleAdd(e) {
		e.preventDefault()
		switch (classe) {
			case 'NS I':
				console.log('test sur test')
				addDoc(cl001Ref, {
					nom
				})
				break;
			case 'NS II':
				console.log('test sur test II')
				break;
			case 'NS III':
				console.log('test sur test III')
		}

	}

	// const test = (e) => {
	//
	// }


	// console.log(testChange)

	return (
		<>
		<div>
				<select
					name="name_id"
					id="ts"
					onChange={e => setClasse(e.target.value)}>
					<option value="0">Classe</option>
					<option value="NS I">Test</option>
					<option value="NS II">Test2</option>
					<option value="NS III">Test3</option>
				</select>
				<input
					value={nom}
					onChange={e => setNom(e.target.value)}
					type="text" placeholder="antre nom an..."/>
				<button onClick={handleAdd}>Ajoute</button>
		<ul>
			{docs?.map((doc) =>
				<div key={Math.random()}>
					<li>{doc.nom}
					</li>
				</div>)}
		</ul>
		</div>
		</>
	)
}


