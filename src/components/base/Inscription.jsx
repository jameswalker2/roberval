import './Inscription.scss'

export function Inscription() {

    // const submitForm = (e) => {
    //     e.preventDefault()
    // }


    return (
        <>
            <div className="container-inscription">
            <form>
                <button>+ Ajouter inscription</button>
                <legend>Informations personnelles</legend>
                <div id="form-info">
                    <div className="info1">
                <input type="text" placeholder="Nom"/>
                <input type="text" placeholder="Prénom"/>
                <input type="date" />
                <input type="text" placeholder="Lieu de naissance"/>
                <input type="text" placeholder="Adresse"/>
                     <div id="gender">
                        <legend>Sexe:</legend>
                        <label htmlFor="male">M</label>
                        <input type="radio" name="gender" id="male" value="male" checked />
                        <label htmlFor="female">F</label>
                        <input type="radio" name="gender" id="female" value="female"/>
                        </div>
                    </div>
                </div>
                <legend>Informations parents</legend>
                <div className="form-parent">
                    <div className="parent-info">
                        <input type="text" placeholder="Nom complet du père"/>
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