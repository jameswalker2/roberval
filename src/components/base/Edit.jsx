import {NavLink} from "react-router-dom";
import {db} from "../login/FirebaseConfig.jsx";
import {BiArrowBack} from "react-icons/bi";
import {IoMdArrowDropdown} from "react-icons/io";
import {doc, setDoc ,getDoc , updateDoc} from "firebase/firestore";
import {useState} from "react";

export function Edit() {

    const [nom, setNom] = useState('')

    const handleUpdate = async (e, id) => {
        e.preventDefault()

        const student = {
            nom
        }
        await setDoc(doc(db, 'inscription', id), {
            ...student
        })
    }


    return (
        <>
            <NavLink to={'/eleves'}>
                <BiArrowBack  id="back"/>
            </NavLink>
            <form onSubmit={handleUpdate}>

            <div className="container-inscription">
                    <button type="submit">update</button>
                    <legend>Informations personnelles</legend>
                    <div id="form-info">
                        <div className="info1">
                            <input
                                id="nom"
                                name="nom"
                                type="text"
                                onChange={e => setNom(e.target.value)}
                            />
                            <input
                                id="prenom"
                                name="prenom"
                                type="text"/>
                            <input
                                id="date"
                                name="date"
                                type="date"
                            />
                            <input
                                id="lieu"
                                name="lieu"
                                type="text"/>
                            <input
                                id="adresse"
                                name="adresse"
                                type="text"/>
                            <select  id="classe" name="classe">
                                <option value='0'></option>
                                <option value='1e Année Kind'> 1e Année Kind</option>
                                <option value='2e Année Kind'> 2e Année Kind</option>
                                <option value='3e Année Kind'> 3e Année Kind</option>
                                <option value='1e Année Fond'> 1e Année Fond</option>
                                <option value='2e Année Fond'> 2e Année Fond</option>
                                <option value='3e Année Fond'> 3e Année Fond</option>
                                <option value='7e Année Fond'> 7e Année Fond</option>
                                <option value='8e Année Fond'> 8e Année Fond</option>
                                <option value='9e Année Fond'> 9e Année Fond</option>
                                <option value='NS I<'> NS I</option>
                                <option value='NS II'> NS II</option>
                                <option value='NS III'> NS III</option>
                                <option value='NS IV'> NS IV</option>
                            </select>
                            <IoMdArrowDropdown id="icon-down"/>
                            <div id="gender">
                                <legend>Sexe:</legend>
                                <label htmlFor="male">M</label>
                                <input type="radio"
                                       name="gender" id="male" />
                                <label htmlFor="female">F</label>
                                <input type="radio" name="gender" id="female"  />
                            </div>
                        </div>
                    </div>
                    <legend>Informations parents</legend>
                    <div className="form-parent">
                        <div className="parent-info">
                            <input
                                id="nom complet du pere"
                                name="nom complet du pere"
                                type="text" />
                            <input
                                id="profession du pere"
                                name="profession du pere"
                                type="text" />
                            <input
                                id="phonePere"
                                name="phonePere"
                                type="text" />
                            <input
                                id="nom complet de la mere"
                                name="nom complet de la mere"
                                type="text" />
                            <input
                                id="profession de la mere"
                                name="profession de la mere"
                                type="text" />
                            <input
                                id="phone de la mere"
                                name="phone de la mere"
                                type="text" />
                        </div>
                    </div>
                    <legend>Personne en cas urgence</legend>
                    <div className="form-urgent">
                        <input
                            id="nom complet u"
                            name="nom complet u"
                            type="text" />
                        <input
                            id="adresse U"
                            name="adresse U"
                            type="text" />
                        <input
                            id="phone U"
                            name="phone U"
                            type="text" />
                        <input
                            id="nom UU"
                            name="nom UU"
                            type="text" />
                        <input
                            id="adresse UU"
                            name="adresse UU"
                            type="text" />
                        <input
                            id="phone UU"
                            name="phone UU"
                            type="text" />
                    </div>
            </div>
            </form>
        </>
    )
}