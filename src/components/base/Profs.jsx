import {BiArrowBack} from "react-icons/bi";
import {NavLink} from "react-router-dom";

export function Profs() {
    return (
        <>
            <NavLink to={'/accueil'}>

                <BiArrowBack  id="back"/>
            </NavLink>
            <h1 style={{Color: 'white', fontSize: '100px'}}>profs</h1>

        </>
    )
}