import {NavLink} from "react-router-dom"
import {supabase} from "../login/SupabaseConfig.jsx"
import {useState} from "react"
import {IoMdArrowDropdown} from 'react-icons/io'
import {BiArrowBack} from "react-icons/bi"
import {BsPersonFillAdd} from 'react-icons/bs'
import './Inscription.scss'

export function Inscription() {
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birth, setBirth] = useState('')
  const [gender, setGender] = useState('')
  const [departmentBirth, setDepartmentBirth] = useState('')
  const [commonBirth, setCommonBirth] = useState('')
  const [adressBirth, setAdressBirth] = useState('')
  const [handicap, setHandicap] = useState('')
  const [wtHandicap, setWtHandicap] = useState('')
  const [adress, setAdress] = useState('')
  const [department, setDepartment] = useState('')
  const [common, setCommon] = useState('')
  const [city, setCity] = useState('')
  const [firstMother, setFirstMother] = useState('')
  const [lastMother, setLastMother] = useState('')
  const [jobMother, setJobMother] = useState('')
  const [statutMother, setStatutMother] = useState('')
  const [firstFather, setFirstFather] = useState('')
  const [lastFather, setLastFather] = useState('')
  const [jobFather, setJobFather] = useState('')
  const [statutFather, setStatutFather] = useState('')
  const [vacation, setVacation] = useState('')
  const [level, setLevel] = useState('')
  const [linkPerson, setLinkPerson] = useState('')
  const [nif, setNif] = useState('')
  const [ninu, setNinu] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otherPhone, setOtherPhone] = useState('')
  const [classe, setClasse] = useState('')

    

    const handleAdd = async (e) => {
        e.preventDefault();
        
        try {
          const {data, error} = await supabase
            .from('students')
            .insert({
              firstName       : firstName,
              lastName        : lastName,
              birth,
              gender          : gender,
              departmentBirth : departmentBirth,
              commonBirth     : commonBirth,
              adressBirth     : adressBirth,
              handicap        : handicap,
              wtHandicap      : wtHandicap,
              adress          : adress,
              department      : department,
              common          : common,
              city            : city,
              firstMother     : firstMother,
              lastMother      : lastMother,
              jobMother       : jobMother,
              statutMother    : statutMother,
              firstFather     : firstFather,
              lastFather      : lastFather,
              jobFather       : jobFather,
              statutFather    : statutFather,
              vacation        : vacation,
              level           : level,
              linkPerson      : linkPerson,
              nif             : nif,
              ninu            : ninu,
              email           : email,
              phone           : phone,
              otherPhone      : otherPhone,
              classe          : classe
            }).single()
          if (error) throw error;
          if (data) {
            console.log(data)
          }
        }catch (error) {
          console.log(error)
        }
      
        // switch (classe) {
        //     case '1e Annee Kind' :
        //         break;
        // }

        e.target.reset(
          setFirstName(''),
          setLastName(''),
          setBirth(''),
          setGender(''),
          setDepartmentBirth(''),
          setCommonBirth(''),
          setAdressBirth(''),
          setHandicap(''),
          setWtHandicap(''),
          setAdress(''),
          setDepartment(''),
          setCommon(''),
          setCity(''),
          setFirstMother(''),
          setLastMother(''),
          setJobMother(''),
          setStatutMother(''),
          setFirstFather(''),
          setLastFather(''),
          setJobFather(''),
          setStatutFather(''),
          setVacation(''),
          setLevel(''),
          setLinkPerson(''),
          setNif(''),
          setNinu(''),
          setEmail(''),
          setPhone(''),
          setOtherPhone(''),
          setClasse('')
        )
    }
  
  

    return (
        <>
            <NavLink to={'/accueil'}>
                <BiArrowBack  id="back"/>
            </NavLink>
          <div className="container-title">
            <h1>Page inscription</h1>
            <p>Tous les champs sont obligatoires</p>
          </div>
            <div className="container-inscription">
            <form onSubmit={handleAdd}>
                <button type="submit"><BsPersonFillAdd id="btn_add"/> Ajouter</button>
                <legend>Informations personnelles</legend>
                <div id="form-info">
                    <div className="info1">
                <input
                    id="nom"
                    name="nom"
                    value={firstName}
                    type="text"
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="Nom"/>
                <input
                    id="prenom"
                    name="prenom"
                    value={lastName}
                    type="text"
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Prénom"/>
                <input
                    id="date"
                    name="date"
                    value={birth}
                    type="date"
                    placeholder="Date de naissance"
                    onChange={e => setBirth(e.target.value)}/>
                <input
                    id="lieu"
                    name="lieu"
                    value={departmentBirth}
                    onChange={e => setDepartmentBirth(e.target.value)}
                    type="text" placeholder="Département de naissance"/>
                <input
                    id="lieu"
                    name="lieu"
                    value={commonBirth}
                    onChange={e => setCommonBirth(e.target.value)}
                    type="text" placeholder="Commune de naissance"/>
                  <input
                    id="lieu"
                    name="lieu"
                    value={adressBirth}
                    onChange={e => setAdressBirth(e.target.value)}
                    type="text" placeholder="Lieu de naissance"/>
                
                        <div id="gender-handicap">
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
                        <legend id="handicap-title">Y a-t-il un handicap ?</legend>
                          <label htmlFor="handicap">Oui</label>
                          <input
                            onChange={(e) => setGender(e.target.value)}
                            value="Female"
                            type="radio" name="handicap" />
                          <label htmlFor="no-handicap">Non</label>
                          <input
                            onChange={(e) => setGender(e.target.value)}
                            value="Female"
                            type="radio" name="no-handicap"/>
                        </div>
                      <select
                        onChange={(e) => setHandicap(e.target.value)}
                        name="handicap" id="handicap">
                        <option value="0">Quel type handicap ?</option>
                        <option value="Moteur">Moteur</option>
                        <option value="Sensoriel">Sensoriel</option>
                        <option value="Cognitif">Cognitif</option>
                        <option value="Psychique">Psychique</option>
                      </select>
                    </div>
                        {/*<IoMdArrowDropdown id="icon-down"/>*/}
                  
                </div>
                {/**/}
                {/**/}
                {/**/}
                {/**/}
                <legend>Informations académiques</legend>
              <div className="form-school">
                <input
                  value={vacation}
                  onChange={e => setVacation(e.target.value)}
                  type="text"
                  placeholder="Vacation"/>
                <input
                  value={level}
                  onChange={e => setLevel(e.target.value)}
                  type="text"
                  placeholder="Niveau d'enseignement"/>
                <select id="classe" name="classe" onChange={e => setClasse(e.target.value)}>
                  <option value='0'>Niveau d'études</option>
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
              </div>
                {/**/}
                {/**/}
                {/**/}
                {/**/}
              <legend>Adresse</legend>
              <div className="adress">
                <input
                  value={adress}
                  onChange={e => setAdress(e.target.value)}
                  type="text" placeholder="Adresse"/>
                <input
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  type="text" placeholder="Département"/>
                <input
                  value={common}
                  onChange={e => setCommon(e.target.value)}
                  type="text" placeholder="Commune"/>
                <input
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  type="text" placeholder="Ville"/>
              </div>
              {/**/}
              {/**/}
              {/**/}
              {/**/}
                <legend>Informations parents</legend>
                <div className="form-parent">
                    <div className="parent-info">
                        <input
                            value={firstFather}
                            onChange={e => setFirstFather(e.target.value)}
                            id="firstFather"
                            name="firstFather"
                            type="text" placeholder="Nom du père"/>
                      <input
                        value={lastFather}
                        onChange={e => setLastFather(e.target.value)}
                        id="lastFather"
                        name="lastFather"
                        type="text" placeholder="Prénom du père"/>
                        <input
                            value={jobFather}
                            onChange={e => setJobFather(e.target.value)}
                            id="jobFather"
                            name="jobFather"
                            type="text" placeholder="Profession"/>
                        <input
                            value={firstMother}
                            onChange={e => setFirstMother(e.target.value)}
                            id="firstMother"
                            name="firstMother"
                            type="text" placeholder="Nom complet de la mère"/>
                      <input
                        value={lastMother}
                        onChange={e => setLastMother(e.target.value)}
                        id="lastMother"
                        name="lastMother"
                        type="text" placeholder="Prénom de la mère"/>
                        <input
                            value={jobMother}
                            onChange={e => setJobMother(e.target.value)}
                            id="jobMother"
                            name="jobMother"
                            type="text" placeholder="Profession"/>
                      <div id="statut">
                        {/**/}
                        <legend>Statut de la mère:</legend>
                        <label htmlFor="dead_mother">Décédée</label>
                        <input
                          onChange={(e) => setStatutMother(e.target.value)}
                          value="Décédée"
                          type="radio"
                          name="dead_mother" id="dead_mother"/>
                        <label htmlFor="life_mother">Vivante</label>
                        <input
                          onChange={(e) => setStatutMother(e.target.value)}
                          value="Vivante"
                          type="radio" name="life_mother" id="life_mother" />
                        {/**/}
                        <legend>Statut du père:</legend>
                        <label htmlFor="dead">Décédé</label>
                        <input
                          onChange={(e) => setStatutFather(e.target.value)}
                          value="Décédé"
                          type="radio"
                          name="dead_father" id="dead_father"/>
                        <label htmlFor="life">Vivant</label>
                        <input
                          onChange={(e) => setStatutFather(e.target.value)}
                          value="Vivant"
                          type="radio" name="life_father" id="life_father" />
                      </div>
                    </div>
                </div>
                {/**/}
                {/**/}
                {/**/}
                {/**/}
                <legend>Personne en cas urgence</legend>
                <div className="form-urgent">
                    <input
                        value={linkPerson}
                        onChange={e => setLinkPerson(e.target.value)}
                        id="nom complet u"
                        name="nom complet u"
                        type="text" placeholder="Nom complet"/>
                    <input
                        value={nif}
                        onChange={e => setNif(e.target.value)}
                        id="adresse U"
                            name="adresse U"
                        type="text" placeholder="Adress"/>
                    <input
                        value={ninu}
                        onChange={e => setNinu(e.target.value)}
                        id="phone U"
                        name="phone U"
                        type="text" placeholder="Téléphone"/>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        id="nom UU"
                        name="nom UU"
                        type="text" placeholder="Nom complet"/>
                    <input
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        id="adresse UU"
                        name="adresse UU"
                        type="text" placeholder="Adress"/>
                    <input
                        value={otherPhone}
                        onChange={e => setOtherPhone(e.target.value)}
                        id="phone UU"
                        name="phone UU"
                        type="text" placeholder="Téléphone"/>
                </div>
            </form>
            </div>
        </>
    )
}
