import {NavLink} from "react-router-dom";
import {BiArrowBack} from 'react-icons/bi'
import {Table} from "./Table.jsx";
import './Eleves.scss'



export function Eleves() {


    return (
        <>
            <div className="container">
                <NavLink to={'/accueil'}>
                    <BiArrowBack  id="back"/>
                </NavLink>
                <Table/>
            </div>
        </>
    )
}

