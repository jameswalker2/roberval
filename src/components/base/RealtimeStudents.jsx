import {useEffect, useState} from "react";
import {collection, onSnapshot} from 'firebase/firestore'
import {db} from'../login/FirebaseConfig.jsx'
// import {studentCollectionRef} from './Eleves.jsx'


const studentCollectionRef = collection(db, 'inscription')

export function RealtimeStudents() {
    const [students, setStudents] = useState([])

    useEffect(() => {
        const test = onSnapshot(studentCollectionRef, snapshot => {
            setStudents(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        })
        return () => {
            test()
        }
    }, [])





    return (
        <>
            <ul>
                {students.map(student =>
                    <li key={student.id}>
                        {student.data.nom}
                        {student.data.prenom}
                        {student.data.date}
                        {student.data.lieu}
                        {student.data.adresse}
                        {student.data.classe}
                        {student.data.nomPere}
                        {student.data.professionPere}
                        {student.data.phonePere}
                        {student.data.nomMere}
                        {student.data.professionMere}
                        {student.data.phonePere}
                        {student.data.nomU}
                        {student.data.adresseU}
                        {student.data.phoneU}
                    </li>
                )}
            </ul>
        </>
    )
}