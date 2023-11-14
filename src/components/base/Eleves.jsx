import {NavLink} from "react-router-dom";
import {BiArrowBack, BiSolidPencil} from 'react-icons/bi'
import './Eleves.scss'
import {FiSearch} from "react-icons/fi";
import {FaRegTrashAlt} from "react-icons/fa";
import {useEffect, useState} from "react";
import {supabase} from "../login/SupabaseConfig.jsx";
import {BsPersonFillAdd} from "react-icons/bs";



export function Eleves() {
    const [students, setStudents] = useState([])
    const [search, setSearch] = useState('students')

    useEffect(() => {
        const allStudents = async () => {
            try {
                const {data, error} = await supabase
                    .from('students')
                    .select('*')
                    .textSearch('search_students', 'id')


                if (data) {
                    setStudents(data)
                    setSearch(data)
                    console.log(error)
                }
            } catch (error) {
                console.log(error)
            }
        }

         allStudents()
    }, [])

    // const handleDelete = async (id) => {
    //     const value = doc(db, 'inscription', id)
    //     await deleteDoc(value)
    // }
    console.log(search)
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
                        onChange={e => setSearch(e.target.value)}
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
                        {students.filter(student => {
                            return search === 'students'
                            ? student
                            : student.firstName.toLowerCase().includes(search)

                        }).map((student) => (
                                <tbody key={student.id} className="scroll">
                                <tr>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.birth}</td>
                                    <td>{student.adressBirth}</td>
                                    <td>{student.gender}</td>
                                    <td>{student.class}</td>
                                    <td>{student.adress}</td>
                                    <td>{student.phone}</td>
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
                        ))}
                    </table>
                </div>
            </div>
        </>
    )
}

