import {NavLink} from "react-router-dom";
import {BiArrowBack, BiSolidPencil} from 'react-icons/bi'
import './Eleves.scss'
import {FiSearch} from "react-icons/fi";
import {FaRegTrashAlt} from "react-icons/fa";
import {useEffect, useState} from "react";
import {collection, deleteDoc, doc, onSnapshot} from "firebase/firestore";
import {db} from "../login/FirebaseConfig.jsx";



export function Eleves() {
    const studentCollectionRef = collection(db, 'inscription')
    const [students, setStudents] = useState([])
    const [search, setSearch] = useState('students')

    useEffect(() => {
        const test = onSnapshot(studentCollectionRef, snapshot => {
            setStudents(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        })
        return () => {
            test()
        }
    }, [])

    const handleDelete = async (id) => {
        const value = doc(db, 'inscription', id)
        await deleteDoc(value)
    }

    return (
        <>
            <div className="container">
                <NavLink to={'/accueil'}>
                    <BiArrowBack  id="back"/>
                </NavLink>
                <div className="search_bar">
                    <FiSearch id="icon_search"/>
                    <input
                        onChange={e => setSearch(e.target.value)}
                        type="search" id="search_bar" placeholder="Cherchez un élève..."/>
                    <NavLink to={'/inscription'}><button>+ Ajouter une nouvelle élève</button></NavLink>
                </div>
                <div>
                    <table   className="table">
                        <thead key='thead'>
                        <tr >
                            <th>Nom</th>
                            <th className="expand">Prénom</th>
                            <th>Date de naissance</th>
                            <th>Lieu de naissance</th>
                            <th>Sexe</th>
                            <th>classe</th>
                            <th>Adresse</th>
                            <th>Téléphone</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        {students.filter(student => {
                            return search.toLowerCase() === 'students'
                                ? student
                                : student.data.nom.toLowerCase().includes(search)
                                || student.data.prenom.toLowerCase().includes(search)
                        }).map((student) =>
                                // eslint-disable-next-line react/jsx-key
                                <tbody key={student.id} className="scroll">
                                <tr>
                                    <td>{student.data.nom}</td>
                                    <td>{student.data.prenom}</td>
                                    <td>{student.data.date}</td>
                                    <td>{student.data.lieu}</td>
                                    <td>{student.data.gender}</td>
                                    <td>{student.data.classe}</td>
                                    <td>{student.data.adresse}</td>
                                    <td>{student.data.phonePere}</td>
                                    <td>
                        <span className="actions">
                            <NavLink id="nav" to={`/edit/${student.id}`}>
                            <BiSolidPencil/>
                            </NavLink>
                            <FaRegTrashAlt onClick={() => handleDelete(student.id)} />
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

