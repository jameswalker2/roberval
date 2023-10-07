import './App.scss'
import {Login} from "./components/login/Login.jsx";
import {Accueil} from "./components/accueil/Accueil.jsx";
import {Route, Routes} from "react-router-dom";
import {Paiement} from "./components/pages/Paiement.jsx";
// import {NavBar} from "./components/header/NavBar.jsx";


function App() {



  return (
    <>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/accueil" element={<Accueil/>} />
            <Route path="/paiement" element={<Paiement/>} />
        </Routes>
    </>
  )
}

export default App
