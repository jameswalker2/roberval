import {NavBar} from "../header/NavBar.jsx";
import './Accueil.scss'
export function Accueil() {
    return (
        <>

            <NavBar/>
            <section className="hd-dash">
                <h2>Dashboard</h2>
                <div id="ct-el">

                    <h3>Elève</h3>
                    <p>Total élèves</p>
                    <h2>20.000</h2>
                </div>
                <div id="ct-st">

                </div>
                <div id="ct-pf">

                </div>
            </section>
        </>
    )
}