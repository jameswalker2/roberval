import {NavLink} from "react-router-dom";
import './NavBar.scss'
import {BiSolidDashboard} from 'react-icons/bi'
import {BsCashCoin} from 'react-icons/bs'
import {FaUsersCog} from 'react-icons/fa'
import {IoSchoolSharp} from 'react-icons/io5'
import {MdAccountBalance} from 'react-icons/md'

export function NavBar() {

    const activeStyle = ({isActive})  => ({
        color: isActive ? '#fff' : '',
        background: isActive ? '#7331f3' : ''
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
                                to={'/dashboard'}>
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