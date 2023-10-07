import {Link} from "react-router-dom";
import './NavBar.scss'
export function NavBar() {
    return (
        <>
            <nav>
                <ul className="home">
                    <div className="hm">
                    <Link className="test" to={'/accueil'}>Dashboard</Link>
                    </div>
                    <div className="pi">
                    <Link className="test" to={'/paiement'}>Paiement</Link>
                    </div>
                    <div className="pa">
                    <Link className="test" to={'/payroll'}>Payroll</Link>
                    </div>
                    <div className="ca">
                    <Link className="test" to={'/caisse'}>Caisse</Link>
                    </div>
                </ul>
            </nav>
        </>
    )
}