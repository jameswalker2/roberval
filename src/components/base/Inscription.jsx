import {NavLink} from "react-router-dom"
import {db} from '../login/FirebaseConfig.jsx'
import {useState} from "react"
import {collection, addDoc} from 'firebase/firestore'
import {IoMdArrowDropdown} from 'react-icons/io'
import {BiArrowBack} from "react-icons/bi"
import {BsPersonFillAdd} from 'react-icons/bs'
import './Inscription.scss'

export function Inscription() {

        const [nom, setNom] = useState('');
        const [prenom, setPrenom] = useState('');
        const [date, setDate] = useState('');
        const [lieu, setLieu] = useState('');
        const [adresse, setAdresse] = useState('');
        const [nomPere, setNomPere] = useState('');
        const [professionPere, setProfessionPere] = useState('');
        const [phonePere, setPhonePere] = useState('');
        const [nomMere, setNomMere] = useState('');
        const [professionMere, setProfessionMere] = useState('');
        const [phoneMere, setPhoneMere] = useState('');
        const [nomU, setNomU] = useState('');
        const [adresseU, setAdresseU] = useState('');
        const [phoneU, setPhoneU] = useState('');
        const [nomUU, setNomUU] = useState('');
        const [adresseUU, setAdresseUU] = useState('');
        const [phoneUU, setPhoneUU] = useState('')
        const [classe, setClasse] = useState('')
        const [gender, setGender] = useState('');
        let   [statut, setStatut] = useState('');
        let   [key, setKey] = useState('')


    const students1CollRef = collection(db, "classes/cl001/students-001")
    const students2CollRef = collection(db, "classes/cl002/students-002")
    const students3CollRef = collection(db, "classes/cl003/students-003")
    const students4CollRef = collection(db, "classes/cl004/students-004")
    const students5CollRef = collection(db, "classes/cl005/students-005")
    const students6CollRef = collection(db, "classes/cl006/students-006")
    const students7CollRef = collection(db, "classes/cl007/students-007")
    const students8CollRef = collection(db, "classes/cl008/students-008")
    const students9CollRef = collection(db, "classes/cl009/students-009")
    const students10CollRef = collection(db, "classes/cl010/students-010")
    const dataStudents = {
        nom,
        prenom,
        date,
        lieu,
        adresse,
        classe,
        gender,
        nomPere,
        professionPere,
        phonePere,
        nomMere,
        professionMere,
        phoneMere,
        nomU,
        adresseU,
        phoneU,
        nomUU,
        adresseUU,
        phoneUU,
        statut,
        key,
    }

    const handleAdd = (e) => {
        e.preventDefault();

        switch (classe) {
            case '1e Annee Kind' :
                addDoc(students1CollRef, {dataStudents})
                    .then(response => {
                        console.log(response)})
                    .catch(error => {
                        console.log(error.message)
                    });
                break;
            case '2e Annee Kind':
                addDoc(students2CollRef, {dataStudents})
                    .then(response => {
                        console.log(response)})
                    .catch(error => {
                        console.log(error.message)
                    });
                break;
            case '3e Annee Kind':
                addDoc(students3CollRef, {dataStudents})
                    .then(response => {
                        console.log(response)})
                    .catch(error => {
                        console.log(error.message)
                    });
                break;
            case '1e Annee Fond':
                addDoc(students4CollRef, {dataStudents})
                    .then(response => {
                        console.log(response)})
                    .catch(error => {
                        console.log(error.message)
                    });
                break;
            case '2e Annee Fond' :
                addDoc(students5CollRef, {dataStudents})
                    .then(response => {
                        console.log(response)})
                    .catch(error => {
                        console.log(error.message)
                    });
                break;
            case '3e Annee Fond' :
                addDoc(students6CollRef, {dataStudents})
                    .then(response => {
                        console.log(response)})
                    .catch(error => {
                        console.log(error.message)
                    });
                break;
            case '4e Annee Fond' :
                addDoc(students7CollRef, {dataStudents})
                    .then(response => {
                        console.log(response)})
                    .catch(error => {
                        console.log(error.message)
                    });
                break;
            case '5e Annee Fond' :
                addDoc(students8CollRef, {dataStudents})
                    .then(response => {
                        console.log(response)})
                    .catch(error => {
                        console.log(error.message)
                    });
                break;
            case '6e Annee Fond' :
                addDoc(students9CollRef, {dataStudents})
                    .then(response => {
                        console.log(response)})
                    .catch(error => {
                        console.log(error.message)
                    });
                break;
            case '7e Annee Fond' :
                addDoc(students10CollRef, {dataStudents})
                    .then(response => {
                        console.log(response)})
                    .catch(error => {
                        console.log(error.message)
                    });
                break;
        }

        e.target.reset(
        setNom(''),
        setPrenom(''),
        setDate(''),
        setLieu(''),
        setAdresse(''),
        setClasse(''),
        setGender(''),
        setNomPere(''),
        setProfessionPere(''),
        setPhonePere(''),
        setNomMere(''),
        setProfessionMere(''),
        setPhoneMere(''),
        setNomU(''),
        setAdresseU(''),
        setPhoneU(''),
        setNomUU(''),
        setAdresseUU(''),
        setPhoneUU(''),
        setKey(key +1),
        setStatut(statut = `non-paye`)
        )
    }

    return (
        <>
            <NavLink to={'/eleves'}>
                <BiArrowBack  id="back"/>
            </NavLink>
            <div className="container-inscription">
            <form onSubmit={handleAdd}>
                <button type="submit"><BsPersonFillAdd id="btn_add"/> Ajouter</button>
                <legend>Informations personnelles</legend>
                <div id="form-info">
                    <div className="info1">
                <input
                    id="nom"
                    name="nom"
                    value={nom}
                    type="text"
                    onChange={e => setNom(e.target.value)}
                    placeholder="Nom"/>
                <input
                    id="prenom"
                    name="prenom"
                    value={prenom}
                    type="text"
                    onChange={e => setPrenom(e.target.value)}
                    placeholder="Prénom"/>
                <input
                    id="date"
                    name="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    type="date" />
                <input
                    id="lieu"
                    name="lieu"
                    value={lieu}
                    onChange={e => setLieu(e.target.value)}
                    type="text" placeholder="Lieu de naissance"/>
                <input
                    id="adresse"
                    name="adresse"
                    type="text"
                    value={adresse}
                    onChange={e => setAdresse(e.target.value)}
                    placeholder="Adresse"/>
                        <select id="classe" name="classe" onChange={e => setClasse(e.target.value)}>
                            <option value='0'>Classe</option>
                            <option value='1e Annee Kind'>1e Année Kind</option>
                            <option value='2e Annee Kind'>2e Année Kind</option>
                            <option value='3e Annee Kind'>3e Année Kind</option>
                            <option value='1e Annee Fond'>1e Année Fond</option>
                            <option value='2e Annee Fond'>2e Année Fond</option>
                            <option value='3e Annee Fond'>3e Année Fond</option>
                            <option value='4e Annee Fond'>4e Année Fond</option>
                            <option value='5e Annee Fond'>5e Année Fond</option>
                            <option value='6e Annee Fond'>6e Année Fond</option>
                            <option value='7e Annee Fond'>7e Année Fond</option>
                            <option value='8e Annee Fond'>8e Année Fond</option>
                            <option value='9e Annee Fond'>9e Année Fond</option>
                            <option value='NS I<'>NS I</option>
                            <option value='NS II'>NS II</option>
                            <option value='NS III'>NS III</option>
                            <option value='NS IV'>NS IV</option>
                        </select>
                        <IoMdArrowDropdown id="icon-down"/>
                        <div id="gender">
                        <legend>Sexe:</legend>
                        <label htmlFor="male">M</label>
                        <input
                            onChange={(e) => setGender(e.target.value)}
                            value="Male"
                            type="radio"
                            name="gender" id="male"/>
                        <label htmlFor="female">F</label>
                        <input
                            onChange={(e) => setGender(e.target.value)}
                            value="Female"
                            type="radio" name="gender" id="female" />
                        </div>
                    </div>
                </div>
                {/**/}
                {/**/}
                {/**/}
                {/**/}
                <legend>Informations parents</legend>
                <div className="form-parent">
                    <div className="parent-info">
                        <input
                            value={nomPere}
                            onChange={e => setNomPere(e.target.value)}
                            id="nom complet du pere"
                            name="nom complet du pere"
                            type="text" placeholder="Nom complet du père"/>
                        <input
                            value={professionPere}
                            onChange={e => setProfessionPere(e.target.value)}
                            id="profession du pere"
                            name="profession du pere"
                            type="text" placeholder="Profession"/>
                        <input
                            value={phonePere}
                            onChange={e => setPhonePere(e.target.value)}
                            id="phonePere"
                            name="phonePere"
                            type="text" placeholder="Téléphone"/>
                        <input
                            value={nomMere}
                            onChange={e => setNomMere(e.target.value)}
                            id="nom complet de la mere"
                            name="nom complet de la mere"
                            type="text" placeholder="Nom complet de la mère"/>
                        <input
                            value={professionMere}
                            onChange={e => setProfessionMere(e.target.value)}
                            id="profession de la mere"
                            name="profession de la mere"
                            type="text" placeholder="Profession"/>
                        <input
                            value={phoneMere}
                            onChange={e => setPhoneMere(e.target.value)}
                            id="phone de la mere"
                            name="phone de la mere"
                            type="text" placeholder="Téléphone"/>
                    </div>
                </div>
                {/**/}
                {/**/}
                {/**/}
                {/**/}
                <legend>Personne en cas urgence</legend>
                <div className="form-urgent">
                    <input
                        value={nomU}
                        onChange={e => setNomU(e.target.value)}
                        id="nom complet u"
                        name="nom complet u"
                        type="text" placeholder="Nom complet"/>
                    <input
                        value={adresseU}
                        onChange={e => setAdresseU(e.target.value)}
                        id="adresse U"
                            name="adresse U"
                        type="text" placeholder="Adress"/>
                    <input
                        value={phoneU}
                        onChange={e => setPhoneU(e.target.value)}
                        id="phone U"
                        name="phone U"
                        type="text" placeholder="Téléphone"/>
                    <input
                        value={nomUU}
                        onChange={e => setNomUU(e.target.value)}
                        id="nom UU"
                        name="nom UU"
                        type="text" placeholder="Nom complet"/>
                    <input
                        value={adresseUU}
                        onChange={e => setAdresseUU(e.target.value)}
                        id="adresse UU"
                        name="adresse UU"
                        type="text" placeholder="Adress"/>
                    <input
                        value={phoneUU}
                        onChange={e => setPhoneUU(e.target.value)}
                        id="phone UU"
                        name="phone UU"
                        type="text" placeholder="Téléphone"/>
                </div>
            </form>
            </div>
        </>
    )
}
