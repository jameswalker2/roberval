import {Link, NavLink} from "react-router-dom";
import './NavBar.scss'
export function NavBar() {
    return (
        <>
            <nav>
                    <h1>Roberval</h1>
                <ul className="home">
                    <div className="hm">
                        <div>
                            <Link className="test" id="test2"  to={'/accueil'}>Dashboard</Link>
                        </div>
                    </div>
                    <div className="hm">
                        <div>
                            <Link className="test"  id="test2" to={'/paiement'}>Paiement</Link>
                        </div>
                    </div>
                    <div className="pa">
                        <div>
                            <Link className="test" to={'/payroll'}>Payroll</Link>
                        </div>
                    </div>
                    <div className="ca">
                        <div>
                            <Link className="test" to={'/caisse'}>Caisse</Link>
                        </div>
                    </div>
                </ul>
            </nav>
        </>
    )
}