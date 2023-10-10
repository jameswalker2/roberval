import {NavLink} from "react-router-dom";
import './NavBar.scss'
import dashboard from '../assets/dashboard.svg'
import paiement from '../assets/paiement.svg'
import payroll from '../assets/payroll.svg'
import caisse from '../assets/caisse.svg'
// import {BiSolidDashboard} from 'react-icons/fa'

export function NavBar() {

    const activeStyle = ({isActive})  => ({
        color: isActive ? '#fff' : '',
        background: isActive ? '#30038B' : ''
    })

    return (
        <>
            <nav>
                    <h1>Roberval</h1>
                <ul className="home">
                    <div className="hm">
                        <div>
                            <NavLink
                                style={activeStyle}
                                className='test'
                                to={'/accueil'}>
                                <img src={dashboard} alt=""/>
                                {/*<BiSolidDashboard/>*/}
                                Dashboard

                            </NavLink>
                        </div>
                    </div>
                    <div className="hm">
                        <div>
                            <NavLink
                                style={activeStyle}
                                className="test"
                                to={'/paiement'}>
                                <img src={paiement} alt=""/>
                                Paiement
                            </NavLink>
                        </div>
                    </div>
                    <div className="pa">
                        <div>
                            <NavLink
                                style={activeStyle}
                                className="test"
                                to={'/payroll'}>
                                <img src={payroll} alt=""/>
                                Payroll
                            </NavLink>
                        </div>
                    </div>
                    <div className="ca">
                        <div>
                            <NavLink
                                style={activeStyle}
                                className="test"
                                to={'/caisse'}>
                                <img src={caisse} alt=""/>
                                Caisse
                            </NavLink>
                        </div>
                    </div>
                </ul>
            </nav>
        </>
    )
}