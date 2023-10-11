import {NavLink} from "react-router-dom";
import './NavBar.scss'
import dashboard from '../assets/dashboard.svg'
import paiement from '../assets/paiement.svg'
import payroll from '../assets/payroll.svg'
import caisse from '../assets/caisse.svg'
import {BiSolidDashboard} from 'react-icons/bi'
import {BsCashCoin} from 'react-icons/bs'
import {FaUsersCog} from 'react-icons/fa'
import {IoSchoolSharp} from 'react-icons/io5'
import {MdAccountBalance} from 'react-icons/md'

export function NavBar() {

    const activeStyle = ({isActive})  => ({
        color: isActive ? '#fff' : '',
        background: isActive ? '#30038B' : ''
    })

    return (
        <>
            <nav>
                <IoSchoolSharp className="h1"/>
                <ul className="home">
                    <div className="hm">
                        <div>
                            <NavLink
                                style={activeStyle}
                                className='test'
                                to={'/accueil'}>
                                <BiSolidDashboard className="img"/>
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
                                <BsCashCoin className="img" />
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
                                <FaUsersCog className="img" />
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
                                <MdAccountBalance className="img"/>
                                Caisse
                            </NavLink>
                        </div>
                    </div>
                </ul>
            </nav>
        </>
    )
}