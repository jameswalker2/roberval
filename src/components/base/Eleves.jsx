// import {useEffect, useState} from "react";
// import {db} from '../login/FirebaseConfig.jsx'
// import { collection, getDocs } from "firebase/firestore";
// import {RealtimeStudents} from "./RealtimeStudents.jsx";
import './Eleves.scss'
import {FiSearch} from 'react-icons/fi'
import {BiArrowBack} from 'react-icons/bi'
// import {Accueil} from "../accueil/Accueil.jsx";
import {NavLink} from "react-router-dom";
import {Table} from "./Table.jsx";



export function Eleves() {
    // const [students, setStudents] = useState([])
    //
    // useEffect(() => {
    //     getStudents();
    // }, []);
    //
    //
    // useEffect(() => {
    //     console.log(students)
    // }, [students]);
    //
    // const getStudents = () => {
    //     const studentCollectionRef = collection(db, 'inscription')
    //     getDocs(studentCollectionRef).then(response => {
    //         const std = response.docs.map(doc => ({
    //             data: doc.data(),
    //             id: doc.id,
    //         }))
    //         setStudents(std)
    //     })
    //         .catch(error => console.log(error.message))
    // }


    return (
        <>
            <NavLink to={'/accueil'}>

                <BiArrowBack  id="back"/>
            </NavLink>
            <div className="container">
                <div className="search_bar">
                    <FiSearch id="icon_search"/>
                    <input type="search" id="search_bar" placeholder="Cherchez un élève..."/>
                    <NavLink to={'/inscription'}><button>+ Ajouter une nouvelle élève</button></NavLink>
                </div>
                <div>
                   <Table/>
                </div>

            </div>
        </>
    )
}

