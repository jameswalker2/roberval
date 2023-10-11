import './App.scss'
import {Login} from "./components/login/Login.jsx";
import {Accueil} from "./components/accueil/Accueil.jsx";
import {Route, Routes} from "react-router-dom";
import {Paiement} from "./components/pages/Paiement.jsx";
import {Payroll} from "./components/pages/Payroll.jsx";
import {Caisse} from "./components/pages/Caisse.jsx";
// import {NavBar} from "./components/header/NavBar.jsx";
// import {NavBar} from "./components/header/NavBar.jsx";


function App() {


  return (
    <>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/accueil" element={<Accueil/>} />
            <Route path="/paiement" element={<Paiement/>} />
            <Route path="/payroll" element={<Payroll/>} />
            <Route path="/caisse" element={<Caisse/>} />
        </Routes>

    </>
  )
}

export default App
