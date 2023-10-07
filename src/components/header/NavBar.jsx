import {Link} from "react-router-dom";

export function NavBar() {
    return (
        <>
            <nav>
                <ul>
                    <Link style={{color: 'white', fontSize: '50px', textDecoration: 'none',}} to='/'>Déconnecter</Link>
                   <h1 style={{color: 'white'}}>Test</h1>
                </ul>
            </nav>
        </>
    )
}