import './App.scss'
import {Login} from "./components/login/Login.jsx";
import {Accueil} from "./components/accueil/Accueil.jsx";
import {Route, Routes} from "react-router-dom";
// import {NavBar} from "./components/header/NavBar.jsx";


function App() {



  return (
    <>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/accueil" element={<Accueil/>} />
        </Routes>
    </>
  )
}

export default App
