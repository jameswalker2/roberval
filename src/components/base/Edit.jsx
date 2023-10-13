import {NavLink} from "react-router-dom";
import {db} from "../login/FirebaseConfig.jsx";
import {BiArrowBack} from "react-icons/bi";
import {IoMdArrowDropdown} from "react-icons/io";
import {useState} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import { useParams } from "react-router-dom";

export function Edit() {
    const {id} = useParams();
    const update = doc(db, 'inscription', id);

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
    console.log(classe, gender)
    //
    //
    //
    const [enom, setEnom] = useState('');
    const [eprenom, setEprenom] = useState('');
    const [edate, setEdate] = useState('');
    const [elieu, setElieu] = useState('');
    const [eadresse, setEadresse] = useState('');
    const [enomPere, setEnomPere] = useState('');
    const [eprofessionPere, setEprofessionPere] = useState('');
    const [ephonePere, setEphonePere] = useState('');
    const [enomMere, setEmomMere] = useState('');
    const [eprofessionMere, setEprofessionMere] = useState('');
    const [ephoneMere, setEphoneMere] = useState('');
    const [enomU, setEnomU] = useState('');
    const [eadresseU, setEadresseU] = useState('');
    const [ephoneU, setEphoneU] = useState('');
    const [enomUU, setEnomUU] = useState('');
    const [eadresseUU, setEadresseUU] = useState('');
    const [ephoneUU, setEphoneUU] = useState('')
    const [eclasse, setEclasse] = useState('')
    const [egender, setEgender] = useState('');


    const getUpdate = async () => {
        const student = await getDoc(update)
        setEnom(student.data().nom)
        setEprenom(student.data().prenom)
        setEdate(student.data().date)
        setElieu(student.data().lieu)
        setEadresse(student.data().adresse)
        setEclasse(student.data().classe)
        setEgender(student.data().gender)
        setEnomPere(student.data().nomPere)
        setEprofessionPere(student.data().professionPere)
        setEphonePere(student.data().phonePere)
        setEmomMere(student.data().nomMere)
        setEprofessionMere(student.data().professionMere)
        setEphoneMere(student.data().phoneMere)
        setEnomU(student.data().nomU)
        setEadresseU(student.data().adresseU)
        setEphoneU(student.data().phoneU)
        setEnomUU(student.data().nomUU)
        setEadresseUU(student.data().adresseUU)
        setEphoneUU(student.data().phoneUU)
    }
    getUpdate();
    const handleUpdate = async () => {
        await updateDoc(update, {

        })

    }

    return (
        <>
            <NavLink to={'/eleves'}>

                <BiArrowBack  id="back"/>
            </NavLink>
            <div className="container-inscription">
                <form onSubmit={handleUpdate}>
                    <button type="Update">update</button>
                    <legend>Informations personnelles</legend>
                    <div id="form-info">
                        <div className="info1">
                            <input
                                id="nom"
                                name="nom"
                                value={nom}
                                type="text"
                                onChange={e => setNom(e.target.value)}
                                placeholder={enom}/>
                            <input
                                id="prenom"
                                name="prenom"
                                value={prenom}
                                type="text"
                                onChange={e => setPrenom(e.target.value)}
                                placeholder={eprenom}/>
                            <input
                                id="date"
                                name="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                placeholder={edate}
                                type="date"
                            />
                            <input
                                id="lieu"
                                name="lieu"
                                value={lieu}
                                onChange={e => setLieu(e.target.value)}
                                type="text" placeholder={elieu}/>
                            <input
                                id="adresse"
                                name="adresse"
                                type="text"
                                value={adresse}
                                onChange={e => setAdresse(e.target.value)}
                                placeholder={eadresse}/>
                            <select id="classe" name="classe" onChange={e => setClasse(e.target.value)}>
                                <option value='0'>{eclasse}</option>
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
                                <input onChange={(e) => setGender(e.target.value)}
                                       value="Male"
                                       type="radio"
                                       name="gender" id="male" placeholder={egender}/>
                                <label htmlFor="female">F</label>
                                <input onChange={(e) => setGender(e.target.value)}
                                       value="Female"
                                       type="radio" name="gender" id="female" placeholder={egender} />
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
                                type="text" placeholder={enomPere}/>
                            <input
                                value={professionPere}
                                onChange={e => setProfessionPere(e.target.value)}
                                id="profession du pere"
                                name="profession du pere"
                                type="text" placeholder={eprofessionPere}/>
                            <input
                                value={phonePere}
                                onChange={e => setPhonePere(e.target.value)}
                                id="phonePere"
                                name="phonePere"
                                type="text" placeholder={ephonePere}/>
                            <input
                                value={nomMere}
                                onChange={e => setNomMere(e.target.value)}
                                id="nom complet de la mere"
                                name="nom complet de la mere"
                                type="text" placeholder={enomMere}/>
                            <input
                                value={professionMere}
                                onChange={e => setProfessionMere(e.target.value)}
                                id="profession de la mere"
                                name="profession de la mere"
                                type="text" placeholder={eprofessionMere}/>
                            <input
                                value={phoneMere}
                                onChange={e => setPhoneMere(e.target.value)}
                                id="phone de la mere"
                                name="phone de la mere"
                                type="text" placeholder={ephoneMere}/>
                        </div>
                    </div>
                    <legend>Personne en cas urgence</legend>
                    <div className="form-urgent">
                        <input
                            value={nomU}
                            onChange={e => setNomU(e.target.value)}
                            id="nom complet u"
                            name="nom complet u"
                            type="text" placeholder={enomU}/>
                        <input
                            value={adresseU}
                            onChange={e => setAdresseU(e.target.value)}
                            id="adresse U"
                            name="adresse U"
                            type="text" placeholder={eadresseU}/>
                        <input
                            value={phoneU}
                            onChange={e => setPhoneU(e.target.value)}
                            id="phone U"
                            name="phone U"
                            type="text" placeholder={ephoneU}/>
                        <input
                            value={nomUU}
                            onChange={e => setNomUU(e.target.value)}
                            id="nom UU"
                            name="nom UU"
                            type="text" placeholder={enomUU}/>
                        <input
                            value={adresseUU}
                            onChange={e => setAdresseUU(e.target.value)}
                            id="adresse UU"
                            name="adresse UU"
                            type="text" placeholder={eadresseUU}/>
                        <input
                            value={phoneUU}
                            onChange={e => setPhoneUU(e.target.value)}
                            id="phone UU"
                            name="phone UU"
                            type="text" placeholder={ephoneUU}/>
                    </div>
                </form>
            </div>
        </>
    )
}