import {useState} from "react";
import './Inscription.scss'
import { collection, addDoc } from 'firebase/firestore'
import {db} from '../login/FirebaseConfig.jsx'

export function Inscription(eleves, setEleves, getEleves) {

        const [nom, setNom] = useState('');
        const [prenom, setPrenom] = useState('');
        const [date, setDate] = useState('');
        const [lieu, setLieu] = useState('');
        const [adresse, setAdresse] = useState('');

    const handleAdd = async (e) => {
        e.preventDefault();

        const newEleve = {
            nom: nom,
            prenom: prenom,
            date: date,
            lieu: lieu,
            adresse: adresse,
        };
        console.log(newEleve)

        try {
            await addDoc(collection (db, "inscription"), {
                ...newEleve
            });
        } catch (error) {
            console.log(error)
        }


        setEleves(eleves);
        getEleves();
    };

    const test1 = () => {

    }



    return (
        <>
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
                    value={adresse}
                    type="text"
                    onChange={e => setAdresse(e.target.value)}
                    placeholder="Adresse"/>
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
                            id="nom complet du pere"
                            name="nom complet du pere"
                            type="text" placeholder="Nom complet du père"/>
                        <input type="text" placeholder="Profession"/>
                        <input type="text" placeholder="Téléphone"/>
                        <input type="text" placeholder="Nom complet de la mère"/>
                        <input type="text" placeholder="Profession"/>
                        <input type="text" placeholder="Téléphone"/>
                    </div>
                </div>
                <legend>Personne en cas urgence</legend>
                <div className="form-urgent">
                    <input type="text" placeholder="Nom complet"/>
                    <input type="text" placeholder="Adress"/>
                    <input type="text" placeholder="Téléphone"/>
                    <input type="text" placeholder="Nom complet"/>
                    <input type="text" placeholder="Adress"/>
                    <input type="text" placeholder="Téléphone"/>
                </div>
            </form>
            </div>
        </>
    )
}
