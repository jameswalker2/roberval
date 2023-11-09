// import {db} from './login/FirebaseConfig.jsx'
// import {useCollectionData} from "react-firebase-hooks/firestore";
// import {collection, addDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {supabase} from "./login/SupabaseConfig.jsx";

export function TestSubcollection() {
	// const [nom, setNom] = useState('')
	const [students, setStudents] = useState([])
	const [collection, setCollection] = useState([])
	// const [classe, setClasse] = useState()
	
	
	
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
						setStudents(data);
						setCollection(
							[... new Set(data.map((student) => student.class))
							])
					}
				} catch (error) {
					console.log(error)
				}
			}
	
	// console.log(collection)
	
	const student_filter = (studentData) => {
		const filterData = students.filter((student) => student.class === studentData);
		setStudents(filterData)
	}
	
	return (
		<>
			<div>
				<select onSelect={student_filter}
					name="" id="">
					{collection.map((student) => (
						<option value={student}>{student}</option>
						))}
				</select>
				
					{students.map((student) => (
						<h1 key={student.id}>{student.firstName} {student.lastName}</h1>
					))}
			</div>
		</>
	)
}


