import {collection} from "firebase/firestore";
import {db} from "./login/FirebaseConfig.jsx";
import {useCollectionData} from "react-firebase-hooks/firestore";

export function Children( path ) {
	const tesRef = collection(db, path)
	const [docs] = useCollectionData(tesRef)
	// console.log(docs)
	return (
		<>
			<ul>{docs?.map(doc =>
				<h1 key={Math.random()}>
					Hello
					{doc.firstname}
				</h1>
			)}
			</ul>
		</>
	)
}