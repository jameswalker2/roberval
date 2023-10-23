import {db} from './login/FirebaseConfig.jsx'
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection} from "firebase/firestore";
import {Children} from "./Children.jsx";

export function TestSubcollection() {
	const tesRef = collection(db, "classes")
	const [docs] = useCollectionData(tesRef)
	
	
	return (
		<>
		<div>
		<ul>
			{docs?.map((doc) =>
				<div key={Math.random()}>
					<li>{doc.name}</li>
					
					<Children path={`classes/${doc.name}/student`}/>
				</div>)}
		</ul>
		</div>
		</>
	)
}


