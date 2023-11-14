import {useEffect, useState} from "react";
import {supabase} from "./login/SupabaseConfig.jsx";
import Select from 'react-select'

export function TestSubcollection() {
	// const [nom, setNom] = useState('')
	const [students, setStudents] = useState([])
	const [collection, setCollection] = useState([])
	const [selectedCategory, setSelectedCategory] = useState(null)
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
	


	const collectionOptions = collection.map((category) => ({
		value: category,
		label: category
	}))

	const filterStudents = selectedCategory ? students.filter((student) => student.class === selectedCategory.value):students

	return (
		<>
			<div>
				<div style={{width: '500px', height: '50px', padding: '20px'}}>
				<Select
					options={collectionOptions}
					isClearable
					placeholder="Classe"
					onChange={(selectOption) =>setSelectedCategory(selectOption)}
					value={selectedCategory}
				/>
				</div>

						{
							filterStudents.map((student) => (
									<h1 key={student.id}>{student.firstName} {student.lastName}</h1>
								))
						}
			</div>
		</>
	)
}


