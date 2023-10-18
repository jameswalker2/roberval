import {Route, Routes} from "react-router-dom";
import {Login} from "./components/login/Login.jsx";
import {Accueil} from "./components/accueil/Accueil.jsx";
import {Paiement} from "./components/pages/Paiement.jsx";
import {Payroll} from "./components/pages/Pay/Payroll.jsx";
import {Caisse} from "./components/pages/Caisse.jsx";
import {Inscription} from "./components/base/Inscription.jsx";
import {Staffs} from "./components/base/Staffs.jsx";
import {Profs} from "./components/base/Profs.jsx";
import {Eleves} from "./components/base/Eleves.jsx";
import {Edit} from "./components/base/Edit.jsx";
import './App.scss'


function App() {


  return (
    <>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/accueil" element={<Accueil/>} />
            <Route path="/paiement" element={<Paiement/>} />
            <Route path="/payroll" element={<Payroll/>} />
            <Route path="/caisse" element={<Caisse/>} />
            <Route path="/inscription" element={<Inscription/>} />
            <Route path="/staffs" element={<Staffs/>} />
            <Route path="/profs" element={<Profs/>} />
            <Route path="/eleves" element={<Eleves/>} />
            <Route path="/edit/:id" element={<Edit/>} />
        </Routes>
    </>
  )
}

export default App
