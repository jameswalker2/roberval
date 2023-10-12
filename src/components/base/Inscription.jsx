import {useState} from "react";
import { collection, addDoc } from 'firebase/firestore'
import {db} from '../login/FirebaseConfig.jsx'
import './Inscription.scss'
import {IoMdArrowDropdown} from 'react-icons/io'
import {BiArrowBack} from "react-icons/bi";
import {NavLink} from "react-router-dom";

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

    const handleAdd = async (e) => {
        e.preventDefault();

        const studentsCollRef = collection(db, 'inscription')
        addDoc(studentsCollRef, {
            nom,
            prenom,
            date,
            lieu,
            adresse,
            classe,
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
            phoneUU
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.message)
        })

        setNom('')
        setPrenom('')
        setDate('')
        setLieu('')
        setAdresse('')
        setClasse('')
        setNomPere('')
        setProfessionPere('')
        setPhonePere('')
        setNomMere('')
        setProfessionMere('')
        setPhoneMere('')
        setNomU('')
        setAdresseU('')
        setPhoneU('')
        setNomUU('')
        setAdresseUU('')
        setPhoneUU('')

    };

    const test1 = () => {

    }



    return (
        <>
            <NavLink to={'/accueil'}>

                <BiArrowBack  id="back"/>
            </NavLink>
            <div className="container-inscription">
            <form onSubmit={handleAdd}>
                <button type="submit">+ Ajouter inscription</button>
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
                        <select id="classe" name="classe">
                            <option value={classe}> 1e Année Kind</option>
                            <option value={classe}> 2e Année Kind</option>
                            <option value={classe}> 3e Année Kind</option>
                            <option value={classe}> 1e Année Fond</option>
                            <option value={classe}> 2e Année Fond</option>
                            <option value={classe}> 3e Année Fond</option>
                            <option value={classe}> 7e Année Fond</option>
                            <option value={classe}> 8e Année Fond</option>
                            <option value={classe}> 9e Année Fond</option>
                            <option value={classe}> NS I</option>
                            <option value={classe}> NS II</option>
                            <option value={classe}> NS III</option>
                            <option value={classe}> NS IV</option>
                        </select>
                        <IoMdArrowDropdown id="icon-down"/>
                     <div id="gender">
                        <legend>Sexe:</legend>
                        <label htmlFor="male">M</label>
                        <input onChange={test1} type="radio" name="male" id="male"  checked />
                        <label htmlFor="female">F</label>
                        <input onChange={test1} type="radio" name="female" id="female" />
                        </div>
                    </div>
                </div>
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
