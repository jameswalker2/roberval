import {NavLink} from "react-router-dom";
import {BiArrowBack, BiSolidPencil} from 'react-icons/bi'
import './Eleves.scss'
import {FiSearch} from "react-icons/fi";
import {FaRegTrashAlt} from "react-icons/fa";
import {useEffect, useState} from "react";
import {collection, deleteDoc, doc, onSnapshot} from "firebase/firestore";
import {db} from "../login/FirebaseConfig.jsx";
import {BsPersonFillAdd} from "react-icons/bs";



export function Eleves() {
    // const studentCollectionRef = collection(db, 'inscription')
    // const [students, setStudents] = useState([])
    // const [search, setSearch] = useState('students')
    //
    // useEffect(() => {
    //     const test = onSnapshot(studentCollectionRef, snapshot => {
    //         setStudents(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
    //     })
    //     return () => {
    //         test()
    //     }
    // }, [])

    // const handleDelete = async (id) => {
    //     const value = doc(db, 'inscription', id)
    //     await deleteDoc(value)
    // }

    return (
        <>
                <NavLink to={'/accueil'}>
                    <BiArrowBack  id="back"/>
                </NavLink>
            <div className="container_link_el">
                <h1 id="container_h1">Eleves</h1>
                <div>
                    <NavLink className="link_el"  to={'/accueil'}>Dashboard </NavLink>
                    <span>|</span>
                    <NavLink className="link_el"  to={'/paiement'}>Paiement</NavLink>
                </div>
            </div>
            <div className="container">
                <div className="search_bar">
                    <FiSearch id="icon_search"/>
                    <input
                        // onChange={e => setSearch(e.target.value)}
                        type="search" id="search_bar" placeholder="Cherchez un élève..."/>
                    <NavLink id="button_add_el" to={'/inscription'}><BsPersonFillAdd id="btn_add_el"/> Ajouter</NavLink>
                </div>
                <h2 style={{color: 'white', margin: '20px 0'}} >Liste des élèves</h2>
                <div>
                    <table className="table_el">
                        <thead key='thead'>
                        <tr >
                            <th>Nom</th>
                            <th className="expand_el">Prénom</th>
                            <th className="expand_el">Date de naissance</th>
                            <th className="expand_el">Lieu de naissance</th>
                            <th>Sexe</th>
                            <th className="expand_el">classe</th>
                            <th>Adresse</th>
                            <th>Téléphone</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        {/*{students.filter(student => {*/}
                        {/*    return search.toLowerCase() === 'students'*/}
                        {/*        ? student*/}
                        {/*        : student.data.nom.toLowerCase().includes(search)*/}
                        {/*        || student.data.prenom.toLowerCase().includes(search)*/}
                        {/*}).map((student) =>*/}
                        {/*        // eslint-disable-next-line react/jsx-key*/}
                                <tbody key='t' className="scroll">
                                <tr>
                                    <td>Méat</td>
                                    <td>Wood Bert James</td>
                                    <td>12-05-2001</td>
                                    <td>Saint-Marc</td>
                                    <td>Male</td>
                                    <td>7e Année Fond</td>
                                    <td>Fleurenceau</td>
                                    <td>3608-7475</td>
                                    <td>
                        <span className="actions">
                            <NavLink id="nav"
                                     // to={`/edit/${student.id}`
                                     to={`/edit/`
                            }>
                            <BiSolidPencil/>
                            </NavLink>
                            <FaRegTrashAlt
                              // onClick={() => handleDelete(student.id)}
                            />
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

